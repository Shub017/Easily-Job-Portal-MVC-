// Assume an array to store job objects
let id = 2; // Initialize id outside the class

export default class JobsModel {
    constructor(jobCategory, jobDesignation, jobLocation, companyName, salary, deadLineToApply, skillsRequired) {
        this.ID = ++id;
        this.jobCategory = jobCategory;
        this.jobDesignation = jobDesignation;
        this.jobLocation = jobLocation;
        this.companyName = companyName;
        this.salary = salary;
        this.deadLineToApply = deadLineToApply;
        this.skillsRequired = skillsRequired;
        this.jobPosted = new Date().toLocaleString(); // Save the current date and time as a formatted string
        this.noOfApplicants = 0;
    }

    static get() {
        return jobs;
    }

    static updateChanges(jobObj) {
        const index = jobs.findIndex((p) => p.ID === jobObj.ID);
        if (index !== -1) {
            jobs[index] = jobObj;
        }
    }

    static add(jobObj) {
        const newJob = new JobsModel(
            jobObj.jobCategory,
            jobObj.email,
            jobObj.jobLocation,
            jobObj.companyName,
            jobObj.salary,
            jobObj.deadLineToApply,
            jobObj.skillsRequired.split(',')
        );

        jobs.push(newJob);
        console.log(jobs);
    }

    static delete(id) {
        const index = jobs.findIndex((p) => p.ID == id);
        if (index !== -1) {
            jobs.splice(index, 1);
        }
        console.log(jobs);
    }

    static getByID(id) {
        return jobs.find((p) => p.ID == id);
    }

    static filterJobs(searchQuery) {
        return jobs.filter(job => job.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
}

// Initial data
export const jobs = [
    new JobsModel('Full-Stack-Developer', 'email', 'Noida', 'Coding Ninjas', '4 Lakh/annum', '31-dec-2023', ['HTML', 'CSS', 'JS', 'NodeJS', 'Python', 'Django', 'React']),
    new JobsModel('Full-Stack-Developer', 'email', 'Bangalore', 'CodeZen', '20 Lakh/annum', '31-dec-2023', ['HTML', 'CSS', 'JS', 'NodeJS', 'Python', 'React']),
];
