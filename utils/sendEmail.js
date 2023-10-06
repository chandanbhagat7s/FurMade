
const nodemailer = require('nodemailer');
// we need to send email 

async function sendEmail(information) {

    // we need to create the transponder 
    const transponder = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {

            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })


    // we need to set options 
    const options = {
        to: information.to,
        from: "chandanbhagat144@gmail.com",
        subject: information.subject,
        text: information.message
    }


    // we need to send email
    await transponder.sendMail(options)


}

module.exports = sendEmail;





















