package com.stark.training_service.controller;

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

import com.stark.training_service.DTO.TrainingDTO;
import com.stark.training_service.entity.Training;
import com.stark.training_service.exception.ResourceNotFoundException;
import com.stark.training_service.service.TrainingService;

@RestController
@RequestMapping(value = "/training")
@CrossOrigin(value = "http://localhost:9090/*")
public class TrainingController {

	private static final Logger LOGGER = LoggerFactory.getLogger(TrainingController.class);

	@Autowired
	private TrainingService trainingService;

	// Get all Training Details
	@GetMapping()
	public ResponseEntity<List<Training>> getAllTrainingDetails() {
		LOGGER.info("Inside Training Controller :: getAllTrainingDetails");
		List<Training> list = trainingService.getAllTrainingDetails();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// Create Training Details
	@PostMapping()
	public ResponseEntity<Training> createTrainingDetails(@RequestBody TrainingDTO trainingDTO) {
		LOGGER.info("Inside Training Controller :: createTrainingDetails");
		Training training = trainingService.createTrainingDetails(trainingDTO);
		return new ResponseEntity<>(training, HttpStatus.OK);
	}

	// Get a particular Training Details using id
	@GetMapping(value = "/{id}")
	public ResponseEntity<Training> getTrainingDetailsById(@PathVariable Long id) throws ResourceNotFoundException {
		LOGGER.info("Inside Training Controller :: getTrainingDetailsById");
		Training training = trainingService.getTrainingDetailsById(id);
		return new ResponseEntity<>(training, HttpStatus.OK);
	}

	// Get all Training Details of an employee using employee id
	@GetMapping(value = "/course/{employeeId}")
	public ResponseEntity<List<Training>> getAllTrainingDetailsByEmpId(@PathVariable Long employeeId)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Training Controller :: getAllTrainingDetailsByEmpId");
		List<Training> training = trainingService.getAllTrainingDetailsByEmpId(employeeId);
		return new ResponseEntity<>(training, HttpStatus.OK);
	}

	// Get few Training Details of an employee using employee id and course name
	@GetMapping(value = "/course/{employeeId}/{courseName}")
	public ResponseEntity<List<Training>> getAllTrainingDetailsByEmpIdAndName(@PathVariable Long employeeId,
			@PathVariable String courseName) throws ResourceNotFoundException {
		LOGGER.info("Inside Training Controller :: getAllTrainingDetailsByEmpIdAndName");
		List<Training> training = trainingService.getAllTrainingDetailsByEmpIdAndName(employeeId, courseName);
		return new ResponseEntity<>(training, HttpStatus.OK);
	}

	// Update a particular Training Details using id
	@PutMapping(value = "/{id}")
	public ResponseEntity<Training> updateTrainingDetails(@RequestBody TrainingDTO trainingDTO, @PathVariable Long id)
			throws ResourceNotFoundException {
		LOGGER.info("Inside Training Controller :: updateTrainingDetails");
		Training training = trainingService.updateTrainingDetails(trainingDTO, id);
		return new ResponseEntity<>(training, HttpStatus.OK);
	}

	// Delete a particular Training Details using id
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> deleteTrainingDetailsById(@PathVariable Long id) throws ResourceNotFoundException {
		LOGGER.info("Inside Training Controller :: deleteTrainingDetailsById");
		trainingService.deleteTrainingDetailsById(id);
		return new ResponseEntity<>("Training Details : " + id + " was successfully removed.", HttpStatus.OK);
	}
}
