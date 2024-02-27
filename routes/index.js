const express=require('express')
const router = express.Router();



router.get("/",(req,res)=>{
    res.render('user/Home');
});

router.get("/about",(req,res)=>{
    res.render('user/About');
});
router.get("/service",(req,res)=>{
    res.render('user/Service');
});
router.get("/news",(req,res)=>{
    res.render('user/News');
});

router.get("/contact",(req,res)=>{
    res.render('user/Contact');
});
router.get("/jobs",(req,res)=>{
    res.render('user/Job');
});


module.exports=router