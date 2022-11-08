import { Request, Response, NextFunction, RequestHandler } from "express";
import env from "../helpers/env.helper";
import jwt from "jsonwebtoken";
import UsersEntity from "../../entities/users.entity";

const _usersEntity = new UsersEntity();

const authMiddleware = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get authorization header: Bearer <token>
        const authHeader = req.headers.authorization as string;
        // get token from header
        const token = authHeader.split(" ")[1];
        // verify token
        const verifedToken = jwt.verify(token, env("JWT_SECRET"));
        // get user from database
        const user = await _usersEntity.getByUsername(verifedToken.sub as string);
        // if user is not found, throw error
        if (user == null)
            throw new Error("User not found");
        // if user is found, set user in res
        res.locals.user = user;
        // call next middleware
        next();
    } catch (error: any) {
        res.status(401).json(error.message);
    }
}) as RequestHandler;

export { authMiddleware }