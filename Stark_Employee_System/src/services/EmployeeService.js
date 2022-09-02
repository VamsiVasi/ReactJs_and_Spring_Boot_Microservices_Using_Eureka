import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:9090/employee"

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/" + employeeId);
    }

    getEmployeesByFirstName(firstName) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/name/" + firstName)
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/" + employeeId);
    }

    getEmployeeAllTrainings(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/course/" + employeeId);
    }

    getTrainingsByEmpIdAndCourseName(employeeId, courseName) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/course/name/" + employeeId + "/" + courseName)
    }

    getTrainingByEmpIdAndCourseId(employeeId, courseId) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/course/" + employeeId + "/" + courseId);
    }

    createTrainingByEmpId(training, employeeId) {
        return axios.post(EMPLOYEE_API_BASE_URL + "/" + employeeId, training);
    }

    updateTrainingById(training, employeeId, courseId) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/course/" + employeeId + "/" + courseId, training);
    }

    deleteTrainingById(employeeId, courseId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/course/" + employeeId + "/" + courseId);
    }
}

export default new EmployeeService();