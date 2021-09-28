/*Take require packages and assign into variables*/
const express = require("express");
const bodyparser = require('body-parser');
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");

// Run on the port 3001
const port = process.env.PORT || 3001;

// Making public folder static
const static_path = path.join(__dirname, "../public" );
const templates_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views" , templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

app.get("/forgotpassword", (req, res) => {
    res.render("forgotpassword");
});

app.get("/login", (req, res) => {
    res.render("login");
});

//when user Click on Signup button perform this code
app.post('/registrationabcd',async(req,res)=>{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email= req.body.email
    const country = req.body.country
    const contactnumber = req.body.contactnumber
    const username = req.body.username
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword
    
    /*Validations for each and every field which is present in the Signup form*/ 
    const errors={}
    if(firstname && !firstname.match(/^[a-zA-Z\s]*$/)) errors['firstname1']='Firstname only contain letters'
    if(lastname && !lastname.match(/^[a-zA-Z\s]*$/)) errors['lastname1']='Last name can only contain letters'
    if(email && !email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/)) errors['email1']='Enter valid email format'
    if(contactnumber && contactnumber.length != 10) errors['contactnumber2']='Contact number should match with the exact length of 10 digits'
    if(contactnumber && !contactnumber.match(/^[0-9]*$/)) errors['contactnumber1']='Contact number should be in numbers only'
    if(username && !username.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#*_]).{10,20}$/)) errors['username1']='Username should contains atleast one upercase, one lowercase, one number and one special character from @/#/*/_. Size should be atleast 10 and lessthen 20 character'
    if(password && confirmpassword && !confirmpassword.match(password)) errors['password2']='Password has to match'
    if(password && !password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#*_!]).{8,}$/)) errors['password1']='Password should contains atleast one upercase, one lowercase, one number and one special character from @/#/*/_/!. Size should be atleast 8 character'
    const emailExists = await Register.findOne({email:email});
    const userNameExists= await Register.findOne({username:username})
    if(emailExists) errors['email']='Email already exists'
    if(userNameExists) errors['username']='Username already exists'
    
    // If errors object has more then 0 size
    if (Object.keys(errors).length > 0) { 
        res.json({
            status: 'failed', data: {
            errors
        }})
    }
    // Else save the data into database
    else {
        let newNote = new Register({
            firstname,
            lastname,
            email,
            country,
            contactnumber,
            username,
            password,
            confirmpassword
        });

        newNote.save().then((res) => { 
            console.log("RES:",res)
            //res.status(201).render("index");
        }).catch((error)=>{
            console.log("ERROR:",error)
        });

        res.json({status:'success',data:'Working'})

         // Send email to the user after successfully creating account
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'gandhiridham19@gmail.com',
              pass: 'RIDHAM@1999        '
            }
          });
          
          var mailOptions = {
            from: 'gandhiridham19@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: `Hello,
    
                   you are recieving this email because you are successfully registered with Fantasy E-Sports League.
                  
                   Regards,
                   Ridham Gandhi`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
})  

// login check
app.post("/login", async(req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});    

        // res.send(useremail.password);
        // console.log(useremail);
        if(useremail.password === password) {
            res.status(201).render("home");
        } else {
            res.send("Invalid login details!!");
        }

    } catch(error) {
        res.status(400).send("Invalid login details!!");
    }
});

/**********************************************AUTOMATED TESTES FOR REGISTRATION***************************************************/

// Testing code
function EmptyCheck(fN){

    if(fN == ""){
        return false;
    }else{
        return true;
    }
    
}
function onlyAlphabets(fN) {
    if (!/[^a-zA-Z]+/.test(fN)){
        return true;
    } else {
        return false;
    }
}

function uniqueEmail(email1) {

    const email2 = Register.findOne({email:email1});

    //console.log(email2);
    
    if(email1 === email2){
        return true;
    }else{
        return false;
    }
}
//[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_\.-]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}+
//(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})/
///([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/
function emailFormat(emailFormat) {
    ///(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\$%\^&\*])(?=.{10,})/
if(/([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\")@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})/.test(emailFormat)) {
        return true;
    } else {
        return false;
    }
}

function selectCountry(cname) {
    
    if(cname == "canada" || cname == "usa" || cname == "india" || cname == "uk") {
        return true;
    } else {
        return false;
    }
}

function contactLength(num) {
    if(num.length === 10) {
        return true;
    } else {
        return false;
    }
}

function contactContains(num1) {
    if(!/[0-9]+/.test(num1)) {
        return true;
    } else {
        return false;
    }
}

function uniqueUsername(uname) {
    const newuname = Register.findOne({username:uname});
    if(newuname.username === uname) {
        return true;
    } else {
        return false;
    }
}

function usernameContains(uname) {
    if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\$%\^&\*])(?=.{10,})/.test(uname)) {
        return true;
    } else {
        return false;
    }
}

function usernameLength(uname) {
    if(uname.length < 10 || uname.length > 20) {
        return false;
    } else {
        return true;
    }
}

function passwordLength(pass) {
    if(pass.length >= 8) {
        return true;
    } else {
        return false;
    }
}

function passContainsAphabets(pass) {
    if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(pass)) {
        return true;
    } else {
        return false;
    }
}

function similarPassword(pass1, pass2) {
    if(pass1 === pass2) {
        return true;
    } else {
        return false;
    }
}

/**********************************************AUTOMATED TESTES FOR Login***************************************************/

function loginemail(Lemail) {
    const newemail = Register.findOne({email:Lemail});

    if(Lemail.match(newemail)) {
        return true;
    } else {
        return false;
    }
}

function loginpassword(Lemail,Lpass) {
    const newemail = Register.findOne({email:Lemail});

    if(newemail.password === Lpass) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    EmptyCheck,
    onlyAlphabets,
    uniqueEmail,
    emailFormat,
    selectCountry,
    contactLength,
    contactContains,
    usernameContains,
    uniqueUsername,
    usernameLength,
    passwordLength,
    passContainsAphabets,
    similarPassword,
    loginemail,
    loginpassword
}
// test code ends here

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})