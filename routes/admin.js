// const express=require('express');
// const Admin = require('../models/adminmodel');
// const { login, logout } = require('../controller/Admincontroller');
// const router = express.Router();


// router.get("/",(req,res)=>{
//     res.render('admin/dashboard',{ layout: "adminlayout"})
// });

// router.get("/login",(req,res)=>{
//     res.render('admin/Login',{ layout: "adminlayout",adminlogin: true,loginError:null})
// });

// router.post('/login',login);
// router.get('/logout',logout);
// module.exports=router

const express=require('express');
const { login, Getlogin, logout } = require('../controller/Admincontroller');
const { Renderservice, Addservice, Renderservicelist, RenderCountries, Postcountries } = require('../controller/Servicecontroller');
const multer = require('../utils/multer');
const { Addjob, Addjobdata } = require('../controller/Jobcontroller');
const router = express.Router();


router.get("/",(req,res)=>{
    res.render('admin/dashboard',{ layout: "adminlayout"})
});

router.get("/login",Getlogin);

router.post('/login',login);

router.get('/logout',logout);

router.get('/service',Renderservice)
router.post('/addform', multer.single('fileInput'),Addservice);
router.get('/servicelist',Renderservicelist);
router.get('/countries',RenderCountries);
router.post('/addcountries',Postcountries);
router.get('/jobs',Addjob)
router.post('/addjob',Addjobdata);
module.exports=router