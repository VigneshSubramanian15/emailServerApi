var hbs = require("nodemailer-express-handlebars");
const SMTP = require("./SMTPInfo.json");
const nodemailer = require("nodemailer");

module.exports.email = async ({ to, subject, template, context, company }) => {
    const { host, port, user, pass } = SMTP[company];
    console.log(
        JSON.stringify({ to, subject, template, context, company }, "", 4)
    );
    var options = {
        viewEngine: {
            extname: ".hbs", // handlebars extension
            layoutsDir: "View/", // location of handlebars templates
            defaultLayout: template, // name of main template
            partialsDir: "View/", // location of your subtemplates aka. header, footer etc
        },
        viewPath: "View/",
        extName: ".hbs",
    };

    const transporter = nodemailer.createTransport({
        host,
        port: port || 465,
        auth: {
            user,
            pass,
        },
    });

    transporter.use("compile", hbs(options));

    var mail = {
        from: "support@directinstapay.com",
        to,
        subject,
        template,
        context,
    };
    try {
        await transporter.sendMail(mail);
        return true;
    } catch (error) {
        console.log({ error });
        throw "Error Sending Email";
    }
};
