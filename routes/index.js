const express=require('express');
const { Renderhome, Renderservice, Renderjobs, Renderjobdetail, applyjob, Rendersuccess } = require('../controller/Usercontroller');
const router = express.Router();



router.get("/",Renderhome);

router.get("/about",(req,res)=>{
    res.render('user/About');
});
router.get("/service/:slug",Renderservice);

router.get("/news",(req,res)=>{
    res.render('user/News');
});

router.get("/contact",(req,res)=>{
    res.render('user/Contact');
});
router.get("/jobs/:slug",Renderjobs);
router.get("/jobdetail/:slug",Renderjobdetail);
router.post("/submit-form",applyjob);
router.get("/success",Rendersuccess);
module.exports=router