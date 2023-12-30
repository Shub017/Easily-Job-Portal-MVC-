// Importing necessary dependencies 
import path from 'path';
import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import ejsLayouts from 'express-ejs-layouts';
import userController from '../Job Portal/src/controller.js/user.controller.js';
import session from 'express-session';
import requireLogin from './src/MiddleWare/checkLogin.js';
import validationApplication from './src/MiddleWare/validationApplication.js';
import upload from './src/MiddleWare/MulterConfig.js';
import validateRegistration from './src/MiddleWare/validateRegistration.js';
import checkAccount from './src/MiddleWare/checkLogInCredentials.js';
import sendEmailMiddleware from './src/MiddleWare/nodeMailer.js';
import setLastVisitedMiddleware from './src/MiddleWare/cookiesMiddleware.js';
import createJobValidationMiddleware from './src/MiddleWare/createJobValidator.js';





// To save applicant data, import dependecies
import EmployeeData, {applicantData} from './src/model/ApplyModel.js';

const app = express();
const routeController = new userController();
 
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));
app.use(ejsLayouts);
app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Use cookie-parser middleware
app.use(cookieParser());  

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), 'public')));

// Middleware to require login for specific routes
app.use(['/offerJob', '/yourJobs'], requireLogin);

// Use the setLastVisitedMiddleware before rendering routes
app.use(setLastVisitedMiddleware);

// Parsing the data
app.use(express.urlencoded({ extended: true }));






// For rendering the home page
app.get('/', (req, res) => {
    return routeController.getHomePage(req, res);
});

// For rendering the login page
app.get('/login', (req, res) => {
  // Check if a session exists
  if (req.session.user) {
      // If a session exists, redirect to /createJob
      return res.redirect('/offerJob');
  }
  // If no session exists, render the login page
  return routeController.getLogInPage(req, res);
});


// For handling login form submission
app.post('/authenticityCheck',checkAccount,(req, res) => {
    // Add your login logic here using the userController or any other authentication method
    // Set the user as authenticated in the session if login is successful
    req.session.user = { username: 'exampleUser', email: req.body.email };
    res.redirect('/'); // Redirect to a dashboard or any other authenticated route
});


// To render jobs
app.get('/Availablejobs',(req, res)=>{
  routeController.getJobs(req, res);
})



app.post('/applyForJob', upload.single('cv'), validationApplication, (req, res, next) => {
  const { name, email, contact } = req.body;
  const { filename } = req.file;

  // Create an instance of EmployeeData
  const applicant = new EmployeeData(name, email, contact, filename);

  // Save the applicant
  applicant.saveApplicant();

  // Retrieve all applicants
  const allApplicants = EmployeeData.getAllApplicants();
  console.log(allApplicants);

  // Render the view with the fileUploaded variable
  res.render('success');
  next();
});

// post Call for registration for new registration
app.post('/registratomFormSubmission', validateRegistration, routeController.saveRegistration,(req, res)=>{
  console.log("Registered Successfully");
  res.redirect('/login');
});

// Creating new job
app.post('/createJob', createJobValidationMiddleware ,routeController.storeJobDetails,routeController.getHomePage);

// Updating job
app.get('/updateJob', routeController.updateJob);
app.post('/updateJob', createJobValidationMiddleware, routeController.storeJobDetails, (req, res)=>{
  res.redirect('/yourJobs');
})

// Get request for registration by new user
app.get('/register',routeController.getRegistrationPage);

// Additional routes with authentication
app.get('/offerJob', routeController.createJob);


// To look what jobs are available to apply on
app.get('/yourJobs', routeController.DisplayEmployerJobs);

// Getting more details about certain jobs
app.get('/moreDetailsAboutJob', routeController.moreDetailsAboutJob);


// To handle delete request from Employer
app.post('/deleteJob', routeController.deleteJob);


// Search Query handler
app.get('/search', routeController.searchHandler);


// handle fetching applicant details
app.get('/getApplicants', routeController.DisplayApplicants);

app.use('/CVs', express.static(path.join(path.resolve(), 'CVs')));



// Export for server.js to import
export default app;
