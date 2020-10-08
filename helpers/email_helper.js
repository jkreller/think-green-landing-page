const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

class EmailHelper {
    static sendMailWithMailjet(to, subject, html, callback) {
        const data = {
            from: 'no-reply@think-green.app',
            to: to,
            subject: subject,
            html: html
        };

        let transporter = nodemailer.createTransport({
            host: 'in-v3.mailjet.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILJET_USERNAME,
                pass: process.env.MAILJET_PASSWORD
            }
        });

        transporter.sendMail(data, callback);
    }

    static async sendConfirmationMailWithMailJet(user, confirmationLink) {
        const email = new Email({
            views: {
                options: {
                    extension: 'twig'
                }
            }
        });

        const renderedMail = await email.render(path.join(__dirname, '..', 'emails', 'confirmation'), {confirmationLink: confirmationLink}); //azure
        this.sendMailWithMailjet(user.email, 'think.green - Newsletter Confirmation', renderedMail);
    }
}

module.exports = EmailHelper;