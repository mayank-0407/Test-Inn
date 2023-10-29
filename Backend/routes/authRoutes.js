var { Router } = require("express");
const signUp = require("../controllers/SignUp");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const Reset  = require("../controllers/reset");
const checkReset  = require("../controllers/checkReset");
const getemailreset  = require("../controllers/getemailreset");
const studentController  = require("../controllers/studentController");
const path=require('path');
var express=require('express');
const app=express();
const bodyparser=require('body-parser');
const multer=require("multer");

const router = Router();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'Static')))

var Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./Static/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

var upload=multer({storage:Storage});

router.post("/signup", signUp);
router.post("/login", login);
router.post("/auth", auth);
router.post("/reset", Reset);
router.get("/reset/:id", getemailreset);
router.post("/reset/:id/submit", checkReset);
router.post("/import/student/:id",upload.single('students'), studentController.importStudent);

module.exports = router;
