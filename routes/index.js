const express=require('express');
const { Renderhome, Renderservice, Renderjobs, Renderjobdetail, applyjob, Rendersuccess, RenderAbout, RenderNews, RenderContact } = require('../controller/Usercontroller');
const { AddContactForm } = require('../controller/Contactcontroller');
const { RenderAbroad } = require('../controller/Abroadcontroller');
const router = express.Router();



router.get("/",Renderhome);

router.get("/about",RenderAbout)
router.get("/service/:slug",Renderservice);

router.get("/news",RenderNews);

router.get("/contact",RenderContact);
router.get("/jobs/:slug",Renderjobs);
router.get("/jobdetail/:slug",Renderjobdetail);
router.post("/submit-form",applyjob);
router.get("/success",Rendersuccess);

router.post('/Addcontact',AddContactForm);
router.get('/abroad',RenderAbroad);
module.exports=router