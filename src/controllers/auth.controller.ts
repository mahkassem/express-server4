import { Request, RequestHandler, Response } from 'express';
import { User } from '../entities/users.entity';
import AuthService from '../services/auth.service';
import { sendEmail } from '../services/mail.service';

const _authService = new AuthService();

const registerHandler = (async (req: Request, res: Response): Promise<void> => {
    try {
        // get user from request body
        const user = req.body as User;
        // use authService to register user
        const registeredUser = await _authService.register(user);
        // send email to user
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        sendEmail({
            to: `${registeredUser.name} <${registeredUser.username}>`,
            subject: 'Welcome to School',
            text: `Hi, ${registeredUser.name},\n\nYour account has been created successfully.\n\nRegards,\nSchool Admin`,
        });
        // return response
        res.status(201).send(registeredUser);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}) as RequestHandler

const loginHandler = (async (req: Request, res: Response): Promise<void> => {
    try {
        // get user from request body
        const user = req.body as User;
        // use authService to login user
        const loggedInUser = await _authService.login(user);
        // return response
        res.send(loggedInUser);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}) as RequestHandler

export { registerHandler, loginHandler };