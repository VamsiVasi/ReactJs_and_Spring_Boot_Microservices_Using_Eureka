package com.stark.employee_service.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stark.employee_service.DTO.EmployeeDTO;
import com.stark.employee_service.DTO.TrainingDTO;
import com.stark.employee_service.entity.Employee;
import com.stark.employee_service.exception.ResourceNotFoundException;
import com.stark.employee_service.service.EmployeeService;

@RestController
@RequestMapping(value = "/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

	private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeController.class);

	@Autowired
	private EmployeeService employeeService;

	// Get all employees
	@GetMapping()
	public ResponseEntity<List<Employee>> getAllEmployees() {
		LOGGER.info("Inside Employee Controller :: getAllEmployee");
		List<Employee> list = employeeService.getAllEmployees();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// Create an employee
	@PostMapping()
	public ResponseEntity<String> createEmployee(@RequestBody EmployeeDTO employeeDTO)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: createEmployee");
		if (employeeDTO.getFirstName() == null || employeeDTO.getLastName() == null || employeeDTO.getAddress() == null
				|| employeeDTO.getDateOfBirth() == null) {
			LOGGER.error("Enter Mandatory Details :: createEmployee");
			throw new ResourceNotFoundException("Please enter mandatory details");
		}
		Employee emp = employeeService.createEmployee(employeeDTO);
		return new ResponseEntity<>(emp.getFirstName() + " " + emp.getLastName() + " details were successfully added",
				HttpStatus.OK);
	}

	// Create Training Details for an employee using employee id
	@PostMapping(value = "/{employeeId}")
	public ResponseEntity<String> addTrainingDetailsByEmployeeId(@RequestBody TrainingDTO trainingDTO,
			@PathVariable Long employeeId) throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: addTrainingDetailsByEmployeeId");
		if (trainingDTO.getCourseName() == null || trainingDTO.getCode() == null || trainingDTO.getScore() == null
				|| trainingDTO.getTimeSpent() == null || trainingDTO.getDateOfCompletion() == null
				|| trainingDTO.getStatus() == null) {
			LOGGER.error("Enter Mandatory Details :: addTrainingDetailsByEmployeeId");
			throw new ResourceNotFoundException("Please enter mandatory details");
		}
		TrainingDTO course = employeeService.addTrainingDetailsByEmployeeId(trainingDTO, employeeId);
		return new ResponseEntity<>("Employee : " + employeeId + ", Your " + course.getCourseName()
				+ " Course Training Details were successfully added. ", HttpStatus.OK);
	}

	// Get an employee using employee id
	@GetMapping(value = "/{employeeId}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long employeeId) throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: getEmployeeById");
		Employee emp = employeeService.getEmployeeById(employeeId);
		return new ResponseEntity<>(emp, HttpStatus.OK);
	}

	// Get list of employees using employee name
	@GetMapping(value = "/name/{userName}")
	public ResponseEntity<List<Employee>> getEmployeesByName(@PathVariable String userName)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: getEmployeesByName");
		List<Employee> emps = employeeService.getEmployeesByName(userName);
		return new ResponseEntity<>(emps, HttpStatus.OK);
	}

	// Get all Training Details of an employee using employee id
	@GetMapping(value = "/course/{employeeId}")
	public ResponseEntity<TrainingDTO[]> getEmployeeAllCoursesById(@PathVariable Long employeeId)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: getEmployeeAllCoursesById");
		TrainingDTO[] empCourses = employeeService.getEmployeeAllCoursesById(employeeId);
		return new ResponseEntity<>(empCourses, HttpStatus.OK);
	}

	// Get all particular Training Details of an employee using employee id and
	// course name
	@GetMapping(value = "/course/name/{employeeId}/{courseId}")
	public ResponseEntity<TrainingDTO[]> getEmployeeCourseByIdAndName(@PathVariable Long employeeId,
			@PathVariable String courseName) throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: getEmployeeCourseByIdAndName");
		TrainingDTO[] empCourses = employeeService.getEmployeeCourseByIdAndName(employeeId, courseName);
		return new ResponseEntity<>(empCourses, HttpStatus.OK);
	}

	// Get a particular Training Details of an employee using employee id and course
	// id
	@GetMapping(value = "/course/{employeeId}/{courseId}")
	public ResponseEntity<TrainingDTO> getEmployeeCourseById(@PathVariable Long employeeId, @PathVariable Long courseId)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: getEmployeeCourseById");
		TrainingDTO empCourse = employeeService.getEmployeeCourseById(employeeId, courseId);
		return new ResponseEntity<>(empCourse, HttpStatus.OK);
	}

	// Update employee details using employee id
	@PutMapping(value = "/{employeeId}")
	public ResponseEntity<String> updateEmployee(@RequestBody EmployeeDTO employeeDTO, @PathVariable Long employeeId)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: updateEmployee");
		if (employeeDTO.getFirstName() == null || employeeDTO.getLastName() == null || employeeDTO.getAddress() == null
				|| employeeDTO.getDateOfBirth() == null) {
			LOGGER.error("Enter Mandatory Details :: updateEmployee");
			throw new ResourceNotFoundException("Please enter mandatory details");
		}
		Employee emp = employeeService.updateEmployee(employeeDTO, employeeId);
		return new ResponseEntity<>(
				emp.getFirstName() + " " + emp.getLastName() + " details were successfully updated.", HttpStatus.OK);
	}

	// Update a particular Training Details of an employee using employee id and
	// course id
	@PutMapping(value = "/course/{employeeId}/{courseId}")
	public ResponseEntity<String> updateEmployeeCourseById(@RequestBody TrainingDTO trainingDTO,
			@PathVariable Long employeeId, @PathVariable Long courseId) throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: updateEmployeeCourseById");
		if (trainingDTO.getCourseName() == null || trainingDTO.getCode() == null || trainingDTO.getScore() == null
				|| trainingDTO.getTimeSpent() == null || trainingDTO.getDateOfCompletion() == null
				|| trainingDTO.getStatus() == null) {
			LOGGER.error("Enter Mandatory Details :: updateEmployeeCourseById");
			throw new ResourceNotFoundException("Please enter mandatory details");
		}
		employeeService.updateEmployeeCourseById(trainingDTO, employeeId, courseId);
		return new ResponseEntity<>(
				"Employee : " + employeeId + ", Your course : " + courseId + "details were successfully updated.",
				HttpStatus.OK);
	}

	// Delete a particular Training Details of an employee using employee id and
	// course id
	@DeleteMapping(value = "/course/{employeeId}/{courseId}")
	public ResponseEntity<String> deleteEmployeeCourseById(@PathVariable Long employeeId, @PathVariable Long courseId)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: deleteEmployeeCourseById");
		employeeService.deleteEmployeeCourseById(employeeId, courseId);
		return new ResponseEntity<>(
				"Employee : " + employeeId + ", Your course : " + courseId + " details was successfully removed.",
				HttpStatus.OK);
	}

	// Delete an employee with all his/her Training Details using employee id
	@DeleteMapping(value = "/{employeeId}")
	public ResponseEntity<String> deleteEmployee(@PathVariable Long employeeId) throws ResourceNotFoundException {
		LOGGER.info("Inside Employee Controller :: deleteEmployee");
		employeeService.deleteEmployee(employeeId);
		return new ResponseEntity<>("Employee : " + employeeId + " was successfully removed", HttpStatus.OK);
	}
}
