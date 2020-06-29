// const nodemailer = require('nodemailer')

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//            user: 'satyakidev@gmail.com',
//            pass: 'toton233'
//        }
//    })

//    const mailOptions = {
//     from: 'satyakidev@gmail.com', // sender address
//     to: 'satyakidesarkar2017@gmail.com', // list of receivers
//     subject: 'Subject of your email', // Subject line
//     html: '<p><h1><div>Hi this a test message<div></h1></p>'// plain text body
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if(err)
//       console.log(err)
//     else
//       console.log(info);
//  });


const mongoose = require('mongoose')
/////////////////mongoDb.................

mongoose.connect('mongodb://localhost/medica', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const  Schema = mongoose.Schema;

const BlogPost = new Schema({
 
  title: String,
  body: String,
  date: Date,
  comments: String
});

const mymodel=mongoose.model('cure',BlogPost)

const min = new mymodel({
    title: "1233",
    body : "gddsddjjj",
    date: new Date(),
    comments:'odsadhdgsadgagdsgdgdjgd'
})

min.save(function (err) {
  if (!err) console.log('Success!');
});