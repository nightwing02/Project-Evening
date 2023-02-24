const express = require("express");
const router = express.Router();
const path = require("path")
var bodyparser = require('body-parser')
const { check, validationResult } = require('express-validator');//for validation
var mysql = require('mysql');//mysql
var session = require('express-session')//for session
// const multer = require("multer"); //file upload 
const fileUpload = require("express-fileupload");

/*---------------- config session and insert secert key -----------------*/
router.use(session({ secret:'djfhklasfjhsdkljfhlks'}))

// parse application/json
router.use(bodyparser.json())             
const urllenCode = bodyparser.urlencoded({ extended: false });

//file upload
router.use(fileUpload())

//for email
const nodemailer = require("nodemailer");
const { METHODS } = require("http");

//middleware
router.use((req, res, next) => {
    
    res.locals.username = req.session.username;
    res.locals.email = req.session.email;
    res.locals.mobile = req.session.mobile;
    res.locals.login = req.session.login
    next(null, req, res);
})

//connection 
const conn = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "form" })


// const storage= multer.diskStorage({
//     destination :(req,file,callb)=>{
//         callb(null,"images")
//     },
//     filename:(req,file,callb)=>{
//         console.log(file)
//         callb(null,file.originalname+ '-' + Date.now()+".jpg")
//     }
// })
// const upload = multer({storage:storage})


//your email id and password



 



router.get("/", (req, res) => {
    res.render("users/login");
})


/* Insert Data */
 router.post("/insert",[
//     check("xname", "Please Insert More then 3 charecotor").isLength({ min: 3 }),
//     check("xemail", "Email is Invalied!").isEmail(),
//     check("xmobile", "Please Insert Current Mobile Number").isLength({ min: 10, max: 10 }),
//     check("xpassword", "Invalied Passwod is Invalied !").isLength({ min: 6 }).isAlphanumeric()
//     //check("xconfirm","Password and confirm Password is not match").equals("xpassword")
],(req, res) => {

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.mapped();
        res.render("users/registration", { err: error })
    }
    else {
        var name = req.body.xname;
        var email = req.body.xemail;
        var mobile = req.body.xmobile;
        var password = req.body.xpassword;
        var confirm = req.body.xconfirm;
        let imageObj = req.files.ximg;
        if (password != password) {
            const error = errors.mapped();
            error.xconfirm.msg = "Password and confrim password is not match";
            res.render("users/registration", { err: error })
        }
        else {
                conn.connect((error) => {
                qry = "select * from register where email='" + email + "' or mobile='" + mobile + "'";
                conn.query(qry, (error, result, field) => {
                    if (error)
                        res.render("users/registration", { err: [], Err: "Problem to fire Query", status: 1 })
                    if (result.length >= 1)
                        res.render("users/registration", { err: [], Err: "Email Or Mobile Number is already Exsit", status: 1 })

                    else {
                        let mypath = __dirname + "/images/" + imageObj.name;
                        imageObj.mv(mypath, (error) => {
                            if (error)
                                res.render("users/registration", { err: [], Err: "File not uploaded" + error, staus: 0 })
                            else {

                                qry = "insert into register set name='" + name + "', email='" + email + "', mobile='" + mobile + "', password='" + password +"', image='"+ imageObj.name+"'" 
                                conn.query(qry,(error, result, field) => {
                                    if (result)
                                        res.render("users/registration", { err: [], Err: "Successfully Registeration", status: 1 })
                                    else
                                        res.render("users/registration", { err: [], Err: "Registeration Error", status: 0 })

                                })

                            }


                        })



                    }
                })
            });
        }

    }

}
)
/* Insert Data */

/*------------------------------ login data check ***************/
router.post("/login", urllenCode, [
    check("xemail", "Email is Invalied!").isEmail(),
    check("xpassword", "Invalied Passwod is Invalied !")
], (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.mapped();
        res.render("/", { err: error })
    }
    else {
        email = req.body.xemail;
        password = req.body.xpassword
        qry = "select * from  register where email='" + email + "' and password='" + password + "'";
        conn.connect((error) => {
            conn.query(qry, (error, result, field) => {
                if (result.length>=1) {
                    res.locals.login = req.session.login = true
                    res.locals.username = req.session.username = result[0].name
                    res.locals.email = req.session.email = result[0].email
                    res.locals.mobile = req.session.mobile = result[0].mobile
                    res.render("pages/home");

                }
                else {
                    res.render("users/login", { Err: "Email or Password is incorrect !", status: 0 });
                }
            })

        })
    }

})


router.get("/Registration", (req, res) => {
    res.render("users/registration", { err: false })
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("users/login")
})

router.get("/forget", (req, res) => {
    res.render("users/forget", { err: false })
})

router.post("/email-auth",(req,res)=>{

        email = req.body.xemail;
        console.log(email);
        qry = "select * from register where email = '" + email +"'";
        conn.connect((error) => {
            conn.query(qry, (error, result, field) => {
                console.log(result);
                if (result.length>=1) {
                    res.locals.email = req.session.email = email;
                    
                    var message = {
                        from: 'animejusticex@gmail.com',
                        to: email,
                        subject: 'Hello world',
                        text: 'AA GAYA!'
                      };
                      nodemailer.mail(message);
                      res.render("user/forget",{mess:"Email sent",status:1});
                }
                else {
                    console.log("Error");
                    res.render("users/forget", { Err: "Email not in register !", status: 0 });
                }
            })

        })


    
    
})
module.exports = router;