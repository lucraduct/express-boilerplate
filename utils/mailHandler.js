/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */
const nodeMailer = require("nodemailer");
const mailerhbs = require("nodemailer-express-handlebars");
const path = require("path");
const logger = require("../logger");

class MailTransporter {
  constructor(template) {
    this.transporter = nodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    this.transporter.use("compile", mailerhbs(this.templateOptions(template)));
  }

  templateOptions(template) {
    return {
      viewEngine: {
        extName: ".html",
        partialsDir: path.resolve("views/email"),
        layoutsDir: path.resolve("views/email"),
        defaultLayout: `${template}.html`,
      },
      viewPath: path.resolve("views/email"),
      extName: ".html",
    };
  }

  getTransporter() {
    return this.transporter;
  }

  async verifyTransport() {
    return this.transporter.verify();
  }

  sendMail(mailContent, close = true) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailContent, async (err) => {
        if (close) this.closeTransport();
        if (err) {
          logger.error(err.message);
          return reject(err);
        }
        return resolve(true);
      });
    });
  }

  closeTransport() {
    this.transporter.close();
  }
}

const mailer = ({ to, subject, template, context, from }) =>
  new Promise((resolve, reject) => {
    const mail = new MailTransporter(template);
    const mailContent = {
      to,
      subject,
      template,
      attachments: [],
      context,
      from,
    };
    mail.sendMail(mailContent).then(
      (mailInfo) => resolve(mailInfo),
      (err) => {
        logger.error(err);
        reject(err);
      }
    );
  });

exports.sendMail =
  (to) =>
  async ({ subject, content, template }) => {
    return await mailer({
      // from: "agilecotea@gmail.com",
      from: "Lucraduct <no-reply@lucraduct.com>",
      to,
      subject,
      template,
      context: content,
    })
      .catch((err) => {
        logger.error(err);
        return err;
      })
      .then((su) => su);
  };
