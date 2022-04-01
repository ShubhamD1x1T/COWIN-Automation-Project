const { application } = require('express');
const express = require('express')
const path = require("path");
const cp = require("child_process");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;
const app = express()

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "dixitshubham189@gmail.com", // generated ethereal user
    pass: "njrqnqroepxwookw", // generated ethereal password
  },
});


app.get('/', function (req, res) {
    let pathofindexfile = path.join(__dirname,'index.html');
  res.sendFile(pathofindexfile);
  
})


app.get("/details/:pin/:age/:email",async function(req,res){

  let pin = req.params.pin;
  let age = req.params.age;
  let email = req.params.email;
 
  console.log(age);
  console.log(email);
  
  
  let arr = cp.execSync(`node script ${pin} ${age}`);
  res.send(arr);
  //console.log(arr+"");
  //res.send(req.params.pin)
  let info = await transporter.sendMail({
    from: '"Shubham Dixit" <dixitshubham189@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: 'Fight Against Covid 👨‍🔬' ,// Subject line
    text: "Vaccination Schedule",// plain text body
    html: "<b>Vaccination Schedule</b>", // html body
    attachments:[{path:"./ScheduleofVaccine.xlsx"}]
  });

})

app.listen(3000)
console.log(":Server is Running......");