package com.stark.employee_service.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.stark.employee_service.DTO.EmployeeDTO;
import com.stark.employee_service.DTO.TrainingDTO;
import com.stark.employee_service.entity.Employee;
import com.stark.employee_service.exception.ResourceNotFoundException;
import com.stark.employee_service.repository.EmployeeRepository;

@Service
public class EmployeeService {

	private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeService.class);

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private EmployeeRepository employeeRepo;

	// Get all employees
	public List<Employee> getAllEmployees() {
		return (List<Employee>) employeeRepo.findAll();
	}

	// Create an employee
	public Employee createEmployee(EmployeeDTO employeeDTO) {
		Employee emp = new Employee();
		emp.setFirstName(employeeDTO.getFirstName());
		emp.setLastName(employeeDTO.getLastName());
		emp.setMiddleName(employeeDTO.getMiddleName());
		emp.setDateOfBirth(employeeDTO.getDateOfBirth());
		emp.setAddress(employeeDTO.getAddress());
		employeeRepo.save(emp);
		return emp;
	}

	// Create Training Details for an employee using employee id
	public TrainingDTO addTrainingDetailsByEmployeeId(TrainingDTO trainingDTO, Long employeeId)
			throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: addTrainingDetailsByEmployeeId");
		Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		trainingDTO.setEmployeeId(employeeId);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		HttpEntity<TrainingDTO> request = new HttpEntity<>(trainingDTO, headers);
		return restTemplate.postForObject("http://Training-Service/training", request, TrainingDTO.class);
	}

	// Get an employee using employee id
	public Employee getEmployeeById(Long employeeId) throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: getEmployeeById");
		return Optional
				.of(employeeRepo.findById(employeeId).orElseThrow(
						() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)))
				.get();
	}

	// Get list of employees using employee name
	public List<Employee> getEmployeesByName(String userName) throws ResourceNotFoundException {
		List<Employee> emps = new ArrayList<>();
		List<Employee> empsByFirstName = employeeRepo.findAllByFirstName(userName);
		emps.addAll(empsByFirstName);
		List<Employee> empsByMiddleName = employeeRepo.findAllByMiddleName(userName);
		emps.addAll(empsByMiddleName);
		List<Employee> empsByLastName = employeeRepo.findAllByLastName(userName);
		emps.addAll(empsByLastName);
		if (emps.isEmpty()) {
			LOGGER.error("No Employees with name '" + userName + "'  were found :: getEmployeesByName");
			throw new ResourceNotFoundException("No Employees were found with given name : " + userName);
		}
		Set<Integer> duplicates = new HashSet<>();
		for (int i = 0; i < emps.size(); i++) {
			for (int j = i + 1; j < emps.size(); j++) {
				if (emps.get(i).getId() == emps.get(j).getId()) {
					duplicates.add(j);
				}
			}
		}
		List<Integer> duplicatesIndexList = new ArrayList<Integer>(duplicates);
		for (int k = duplicatesIndexList.size() - 1; k >= 0; k--) {
			int duplicateValue = duplicatesIndexList.get(k);
			emps.remove(duplicateValue);
		}
		return emps;
	}

	// Get all Training Details of an employee using employee id
	public TrainingDTO[] getEmployeeAllCoursesById(Long employeeId) throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: getEmployeeAllCoursesById");
		Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		try {
			return restTemplate.getForObject("http://Training-Service/training/course/" + employeeId,
					TrainingDTO[].class);
		} catch (Exception e) {
			LOGGER.error("No Course Training Details were found with given employee id - '" + employeeId
					+ "' :: getEmployeeAllCoursesById");
			throw new ResourceNotFoundException(
					"No Course Training Details were found with given employee id : " + employeeId);
		}
	}

	// Get few Training Details of an employee using employee id and course name
	public TrainingDTO[] getEmployeeCourseByIdAndName(Long employeeId, String courseName)
			throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: getEmployeeCourseByIdAndName");
		Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		try {
			return restTemplate.getForObject("http://Training-Service/training/course/" + employeeId + "/" + courseName,
					TrainingDTO[].class);
		} catch (Exception e) {
			LOGGER.error(
					"Employee : " + employeeId + ", No Course Training Details are found with given course name - '"
							+ courseName + "' :: getEmployeeCourseByIdAndName");
			throw new ResourceNotFoundException("Employee : " + employeeId
					+ ", No Course Training Details are found with given course name - '" + courseName + "'");
		}

	}

	// Get a particular Training Details of an employee using employee id and course
	// id
	public TrainingDTO getEmployeeCourseById(Long employeeId, Long courseId) throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: getEmployeeCourseById");
		Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		try {
			return restTemplate.getForObject("http://Training-Service/training/" + courseId, TrainingDTO.class);
		} catch (Exception e) {
			LOGGER.error("No Course Training Details are found with given training id - '" + courseId
					+ "' :: getEmployeeCourseById");
			throw new ResourceNotFoundException(
					"No Course Training Details are found with given training id : " + courseId);
		}

	}

	// Update employee details using employee id
	public Employee updateEmployee(EmployeeDTO employeeDTO, Long employeeId) throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: updateEmployee");
		Optional<Employee> emp = Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		emp.get().setFirstName(employeeDTO.getFirstName());
		emp.get().setLastName(employeeDTO.getLastName());
		emp.get().setMiddleName(employeeDTO.getMiddleName());
		emp.get().setDateOfBirth(employeeDTO.getDateOfBirth());
		emp.get().setAddress(employeeDTO.getAddress());
		employeeRepo.save(emp.get());
		return emp.get();
	}

	// Update a particular Training Details of an employee using employee id and
	// course id
	public void updateEmployeeCourseById(TrainingDTO trainingDTO, Long employeeId, Long courseId)
			throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: updateEmployeeCourseById");
		Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		trainingDTO.setEmployeeId(employeeId);
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			HttpEntity<TrainingDTO> request = new HttpEntity<>(trainingDTO, headers);
			restTemplate.put("http://Training-Service/training/" + courseId, request);
		} catch (Exception e) {
			LOGGER.error("No Course Training Details are found with given training id - '" + courseId
					+ "' :: updateEmployeeCourseById");
			throw new ResourceNotFoundException(
					"No Course Training Details are found with given training id : " + courseId);
		}
	}

	// Delete a particular Training Details of an employee using employee id and
	// course id
	public void deleteEmployeeCourseById(Long employeeId, Long courseId) throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: deleteEmployeeCourseById");
		Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		try {
			restTemplate.delete("http://Training-Service/training/" + courseId);
		} catch (Exception e) {
			LOGGER.error("No Course Training Details are found with given training id - '" + courseId
					+ "' :: deleteEmployeeCourseById");
			throw new ResourceNotFoundException(
					"No Course Training Details are found with given training id : " + courseId);
		}
	}

	// Delete an employee with all his/her Training Details using employee id
	public void deleteEmployee(Long employeeId) throws ResourceNotFoundException {
		LOGGER.info("Check Employee by Id :: deleteEmployee");
		Optional<Employee> emp = Optional.of(employeeRepo.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("No Employee was found with the given Id : " + employeeId)));
		try {
			TrainingDTO[] allCourses = restTemplate
					.getForObject("http://Training-Service/training/course/" + employeeId, TrainingDTO[].class);
			List<TrainingDTO> list = Arrays.asList(allCourses);
			for (int i = 0; i < list.size(); i++) {
				restTemplate.delete("http://Training-Service/training/" + list.get(i).getId());
			}
			employeeRepo.delete(emp.get());
		} catch (Exception e) {
			LOGGER.error("No Course Training Details were found with given employee id - '" + employeeId
					+ "' :: deleteEmployee");
			employeeRepo.delete(emp.get());
		}
	}

}
