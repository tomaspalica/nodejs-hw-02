import nodemailer from "nodemailer";
import postmark from "postmark";
import "dotenv/config";
console.log(process.env.POSTMARK_KEY);
const client = new postmark.ServerClient(process.env.POSTMARK_KEY);

export const postmarkSend = () => {
  client.sendEmail({
    From: "p.suchodolska@spkowale.pl",
    To: "p.suchodolska@spkowale.pl",
    Subject: "Hello from Postmark",
    HtmlBody: "<strong>Hello</strong> dear Postmark user.",
    TextBody: "Hello from Postmark!",
    MessageStream: "broadcast",
  });
};

export const sendAuthEmail = (token) => {
  const config = {
    host: "smtp-broadcasts.postmarkapp.com",
    port: 587,
    auth: {
      user: process.env.POSTMARK_ACCES_KEY,
      pass: process.env.POSTMARK_SECRET_KEY,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "p.suchodolska@spkowale.pl",
    to: "p.suchodolska@spkowale.pl",
    subject: "Weryfikacja konta",
    text: `testowy email`,
    html: `link do autoryzacji <a>http://localhost:3000/api/users/verify/${token}</a>`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((e) => console.log(e));
};
