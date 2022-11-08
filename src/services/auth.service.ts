import UsersEntity, { User } from "../entities/users.entity";
import env from "../utils/helpers/env.helper"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    private readonly _usersEntity: UsersEntity;

    constructor() {
        this._usersEntity = new UsersEntity();
    }

    async register(user: User): Promise<User> {
        user.password = await bcrypt.hash(
            user.password as string + env("BCRYPT_SECRET"),
            parseInt(env("BCRYPT_SALT"))
        );
        const dbUser = await this._usersEntity.create(user);
        delete dbUser.password;
        return dbUser;
    }

    async login(user: User): Promise<User> {
        // get user from request body
        const { username, password } = user;

        // get user from database
        const dbUser = await this._usersEntity.getByUsername(username);

        // if user is not found, return throw error
        if (dbUser == null)
            throw new Error("User not found");

        // compare passwords
        const isMatch = await bcrypt.compare(
            password as string + env("BCRYPT_SECRET"),
            dbUser.password as string
        );

        // if passwords don't match, throw error
        if (!isMatch)
            throw new Error("Incorrect password");

        // generate token
        const token = this.generateToken(dbUser);


        // if passwords match, return user
        delete dbUser.password;

        return { ...dbUser, token };

    }

    generateToken(user: User): string {
        return jwt.sign(
            { sub: user.username },
            env("JWT_SECRET"),
            { expiresIn: 60 }
        )
    }
}

export default AuthService;