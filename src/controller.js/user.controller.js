import {jobs} from '../model/jobModel.js';
import JobsModel from '../model/jobModel.js'; 




import Account from '../model/Accounts.js';

// To save applicant data, import dependecies
import EmployeeData, {applicantData} from '../model/ApplyModel.js';

class RouteController {
  getHomePage(req, res) {
    // Access the lastVisited cookie
    const lastVisitedTime = req.cookies.lastVisited;
  
    // Render the 'layout' template and pass 'index' as the 'body' variable
    res.render('index', { lastVisitedTime });
  }
  

    getJobs(req, res){
      res.render('Jobs', {jobs});
    }

    moreDetailsAboutJob(req, res) {
      const jobId = req.query.id;
      console.log(jobId);
  
      // Find the job with the specified ID
      const job = JobsModel.getByID(jobId);
  
      if (job) {
        // Render the view with job details
        res.render('moreDetails', { job });
      } else {
        // Handle the case where the job with the given ID is not found
        res.status(404).send('Job not found');
      }
    }

    handleFileUpload(req, res, next) {
      // Logic for handling file upload...

      // Create an instance of EmployeeData
      const applicant = new EmployeeData(req.body.name, req.body.email, req.body.contact);

      // Save the applicant
      applicant.saveApplicant();


      // Retrieve all applicants
      const allApplicants = EmployeeData.getAllApplicants();
      console.log(allApplicants);


      // Render the view with the fileUploaded variable
      res.render('success');
      next();
    }

    getRegistrationPage(req, res){
      return res.render('Register');
    }
    getLogInPage(req, res){
      return res.render('login');
    }

    saveRegistration(req, res, next){
      Account.addAccount([req.body.email,  req.body.password]);
      next()
    }

    createJob(req, res){
      res.render('createJob');
    }

    storeJobDetails(req, res, next){
      JobsModel.add(req.body);
      console.log('Job added successfully');
      next();
    }

    DisplayEmployerJobs(req, res, next){
      const userEmail = req.session.user.email.trim();
      console.log(userEmail);
      res.render('yourJobs',{jobs, userEmail});
      console.log('Jobs Available displayed');
    }

    deleteJob(req, res, next){
      const jobId = req.body.jobId;
      console.log(req.body.jobId, jobId);
      JobsModel.delete(jobId);

      console.log("Job Deletion was a success");

      const userEmail = req.session.user.email.trim();
      console.log(userEmail);
      res.render('yourJobs',{jobs, userEmail});
    }

    searchHandler(req, res, next) {
      let searchQuery = req.query.query.trim();
      console.log(searchQuery);
      let results = JobsModel.filterJobs(searchQuery);
      console.log(results);
      res.render('searchResult', { results });
    }
    
    updateJob(req, res, next){
      const jobId = req.query.jobId;
      JobsModel.delete(jobId);
      res.render('updateJob');
    }

    DisplayApplicants(req, res) {
      console.log("About to display applicants");
      // Retrieve all applicants using the EmployeeData class
      const allApplicants = EmployeeData.getAllApplicants();
      console.log(allApplicants);
      // Render the 'applicantDetails' view and pass the applicant data
      res.render('applicantDetails', { applicants: allApplicants });
    }

  }
  export default RouteController;
  