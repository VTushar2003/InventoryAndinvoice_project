const nodemailer = require('nodemailer');

// Function to send email
const sendEmail = async (subject,message,from_email,email_to,reply_to) => {

    const transporter = nodemailer.createTransport({
    host: process.env.HOST,
       service : 'Gmail',
       port : 465,
       secure : true,
       auth : {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, 
       },
       tls : {
        rejectUnauthorized  :false
       }
    });
    //mail options 
   const options ={
       from : from_email,
       to : email_to,
       replyTo : reply_to,
       subject : subject,
       html : message
   }
   //send mail

   transporter.sendMail(options,function (err,info){
    if(err){
        console.log(err);
    }
    else{

        console.log(info);
    }
   })
};

module.exports = sendEmail;  
