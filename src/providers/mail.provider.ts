import nodemailer from 'nodemailer';
import env from '../utils/helpers/env.helper';

export interface MailOptions {
    from?: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

const transport = nodemailer.createTransport({
    host: env('MAIL_HOST'),
    port: parseInt(env('MAIL_PORT')),
    auth: {
        user: env('MAIL_USER'),
        pass: env('MAIL_PASS'),
    },
    debug: env('ENV') === 'dev',

});

export default transport;