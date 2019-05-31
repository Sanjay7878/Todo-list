const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'sanjayinfotechy@gmail.com',
        pass: 'SanjaySan@27'
    }
});

let mailOptions = {
    from: 'sanjayinfotechy@gmail.com',
    to: '',
    subject: '',
    html:''
};

let sendEmail = (reciever,subject,msg) =>{

    mailOptions.to = reciever;
    mailOptions.subject = subject;
    mailOptions.html = msg;

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        }else{
            console.log('Email Sented ' + info.response);
        }
    });

}//end autoEmail
module.exports = {
    sendEmail: sendEmail
}