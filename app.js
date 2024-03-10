const createError = require('http-errors');
const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index.js");
const AdminRouter=require('./routes/admin.js')
const dotenv=require('dotenv')
const expressEjsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const nocache = require("nocache");
const connectDB = require('./config/db.js');


dotenv.config()
const app = express();
// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json()); 
app.use(express.json());
app.use(expressEjsLayouts)
app.use(express.urlencoded({ extended: false }));
// Middleware to serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(session({resave:false,saveUninitialized: true,secret:"key",cookie:{maxAge:6000000}}));
app.use(function (req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});



// // Use the indexRouter for handling routes
app.use("/", indexRouter);
app.use("/admin",AdminRouter);


// Call the connectDB function wherever you need to establish the connection
connectDB();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  req.session.show = false;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{services:[],continent:[],show: req.session.show});
});




// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});