const Admin = require("../models/adminmodel");


const Getlogin =async (req,res)=>{
    // Check if the admin is already logged in
    if (req.session.adminLoggedIn) {
        console.log("Already logged in");
         res.redirect('/admin');
    } else {
        // Admin is not logged in, render the login page
        res.render('admin/Login', { layout: "adminlayout", adminlogin: true, loginError: null });
    }
    // Admin is not logged in, render the login page
    
}

const renderdashboard=async(req,res)=>{
    if (req.session.adminLoggedIn) {
        res.render('admin/dashboard',{ layout: "adminlayout",})
    } else {
        // Admin is not logged in, render the login page
        res.redirect('/admin/login');
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is provided
        if (!email) {
            return res.render('admin/Login', { layout: 'adminlayout', adminlogin: true, loginError: 'Email is required' });
        }

        // Check if the email exists in the database
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.render('admin/Login', { layout: 'adminlayout', adminlogin: true, loginError: 'Email does not exist' });
        }

        // Check if the password is provided
        if (!password) {
            return res.render('admin/Login', { layout: 'adminlayout', adminlogin: true, loginError: 'Password is required' });
        }

        // Check if the password is correct
        if (password !== admin.password) {
            return res.render('admin/Login', { layout: 'adminlayout', adminlogin: true, loginError: 'Incorrect password' });
        }
         // Set the session variable to indicate that the admin is logged in
         req.session.adminLoggedIn = true;
        // If everything is correct, redirect to the admin dashboard or any other page
        res.redirect('/admin');
    } catch (error) {
        console.error('Error checking credentials:', error);
        res.status(500).send('Internal Server Error');
    }
};
const logout = (req, res) => {
    // Clear the session data
    req.session.adminLoggedIn = false;

    // Redirect to the login page
    res.redirect('/admin/login');
};

module.exports = {
    login,
    Getlogin,
    logout,
    renderdashboard
};
