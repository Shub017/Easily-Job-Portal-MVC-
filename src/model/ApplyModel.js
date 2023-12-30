// EmployeeData.js

let idno = 0;
const applicantData = [];

class EmployeeData {
    constructor(name, email, contact, filename) {
        this.id = ++idno;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.filename = filename; // Include the filename in the applicant object
    }

    static getAllApplicants() {
        return applicantData;
    }

    saveApplicant() {
        applicantData.push(this);
    }
}

export { applicantData };
export default EmployeeData;
