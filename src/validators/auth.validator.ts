import { Request, Response, NextFunction, RequestHandler } from "express";
import UsersEntity, { User } from "../entities/users.entity";
import { strRequired } from "./shared.validator";

const _usersEntity = new UsersEntity();

const registerValidator = (async (req: Request, res: Response, next: NextFunction) => {
    // get user from request body
    const { name, username, password } = req.body as User;

    // create errors bag
    const errors = [];

    // validate name
    if (strRequired(name))
        errors.push('Name is required');

    // validate username
    if (strRequired(username)) {
        errors.push('Username is required');
    } else {
        // check if username is already taken
        const user = await _usersEntity.getByUsername(username);
        if (user != null) {
            errors.push('Username is already taken');
        }
    }

    // validate password
    if (strRequired(password as string))
        errors.push('Password is required');

    // if there are errors, return 400
    if (errors.length > 0)
        return res.status(400).json(errors);

        
    // if there are no errors, call next
    next();
}) as RequestHandler;

const loginValidator = (async (req: Request, res: Response, next: NextFunction) => {
    // get user from request body
    const { username, password } = req.body as User;

    // create errors bag
    const errors = [];

    // validate username
    if (strRequired(username))
        errors.push('Username is required');
    // validate password
    if (strRequired(password as string))
        errors.push('Password is required');

    // if there are errors, return 400
    if (errors.length > 0)
        return res.status(400).json(errors);

        
    // if there are no errors, call next
    next();
}) as RequestHandler;

export { registerValidator, loginValidator };