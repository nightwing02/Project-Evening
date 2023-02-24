const express= require("express");
const app=express();
const path= require("path")
const Users = require("./routes/users.js")
let ejs = require('ejs');
// const multer = require("multer"); //file upload 


//setting file
app.set('view engine', 'ejs')
app.set("views","./views")
app.use('/css', express.static(path.join(__dirname, 'public/css/')))
app.use('/js', express.static(path.join(__dirname, 'public/js/')))
app.use('/image', express.static(path.join(__dirname, 'public/image/')))
app.use("/users", Users)

//middleware


// const storage= multer.diskStorage({
//     destination :(req,file,callb)=>{
//         callb(null,"images")
//     },
//     filename:(req,file,callb)=>{
//         console.log(file)
//         callb(null, Date.now()+ path.extname(file.originalname))
//     }


// })

// const upload = multer({storage:storage})


//app.use()


app.get("/",(req,res)=>{
    res.render("pages/home");
})

app.get("/product",(req,res)=>{
    res.render("pages/product");
})

app.get("/service",(req,res)=>{
    res.render("pages/service");
})

app.get("/about",(req,res)=>{
    res.render("pages/about");
})

app.get("/contact",(req,res)=>{
    res.render("pages/contact");
})

// app.get("/upload",(req,res)=>{
//     res.render("pages/upload");
// })

// app.post("/upload",upload.single("ximg"),(req,res)=>{
//    res.send("Image uploaded"); 
// })



app.listen(8000)