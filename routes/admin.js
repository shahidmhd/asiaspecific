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
const { login, Getlogin, logout, renderdashboard } = require('../controller/Admincontroller');
const { Renderservice, Addservice, Renderservicelist, RenderCountries, Postcountries, DeleteCountry, DeleteService, EditService,  } = require('../controller/Servicecontroller');
const multer = require('../utils/multer');
const { Addjob, Addjobdata, DeleteJob, EditJob } = require('../controller/Jobcontroller');
const { AddNewsAndUpdates, RenderNewandUpdates, DeleteNewsandUpdates, EditNewsandUpdates } = require('../controller/News&Updates');
const { GetContactForm, Deletecontact, Deletesubscriber } = require('../controller/Contactcontroller');
const { GetAppliedJobs, Getsubscribers, deleteAppliedJob } = require('../controller/Usercontroller');
const router = express.Router();


router.get("/",renderdashboard);

router.get("/login",Getlogin);

router.post('/login',login);

router.get('/logout',logout);

//  Service  Route
router.get('/service',Renderservice)
router.post('/addform', multer.single('fileInput'),Addservice);
router.get('/servicelist',Renderservicelist);
router.get('/serviceDelete/:id',DeleteService);
router.post('/EditService/:id',multer.single('fileInput'),EditService)

//Countries Route
router.get('/countries',RenderCountries);
router.post('/addcountries',Postcountries);
router.get('/deleteCountry/:id',DeleteCountry);

//Jobs Route
router.get('/jobs',Addjob)
router.post('/addjob',multer.single('fileInput'),Addjobdata);
router.get('/jobDelete/:id',DeleteJob);
router.post('/editjob/:id',multer.single('fileInput'),EditJob);

//New and Updates Routes
router.get('/new&updates',RenderNewandUpdates);
router.post('/addnews', multer.single('fileInput'),AddNewsAndUpdates);
router.get('/deleteNews&updates/:id',DeleteNewsandUpdates);
router.post('/editNewsandupdates/:id',multer.single('fileInput'),EditNewsandUpdates)

//Contact Route
router.get('/contact',GetContactForm);
router.get('/deletecontact/:id',Deletecontact);
router.get('/deletesubscribe/:id',Deletesubscriber);

//Applied Job Route
router.get('/appliedjob',GetAppliedJobs);
router.get('/subscriptionlist',Getsubscribers);
router.get('/appliedJobs/:id',deleteAppliedJob)

module.exports=router