/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import SMTPTransport from "nodemailer/lib/smtp-transport";
import _mail, { MailOptions } from "../providers/mail.provider";
import env from "../utils/helpers/env.helper";

const sendEmail = async (options: MailOptions): Promise<SMTPTransport.SentMessageInfo> => {
    if (!options.from) options.from = `School Admin <${env('MAIL_FROM')}>`;
    if (!options.html) options.html = `<h1>${options.subject}</h1> <p>${newLinesToBr(options.text)}</p>`;
    return await _mail.sendMail(options);
}

const newLinesToBr = (text: string): string => {
    return text.replace(/\r?\n/g, "<br>");
}

export { sendEmail };