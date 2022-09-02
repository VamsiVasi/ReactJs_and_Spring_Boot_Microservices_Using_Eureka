package com.stark.training_service.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stark.training_service.DTO.TrainingDTO;
import com.stark.training_service.entity.Training;
import com.stark.training_service.exception.ResourceNotFoundException;
import com.stark.training_service.repository.TrainingRepository;

@Service
public class TrainingService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TrainingService.class);

	@Autowired
	private TrainingRepository trainingRepo;

	// Get all Training Details
	public List<Training> getAllTrainingDetails() {
		return (List<Training>) trainingRepo.findAll();
	}

	// Create Training Details
	public Training createTrainingDetails(TrainingDTO trainingDTO) {
		Training trainingDetails = new Training();
		trainingDetails.setEmployeeId(trainingDTO.getEmployeeId());
		trainingDetails.setCourseName(trainingDTO.getCourseName());
		trainingDetails.setCode(trainingDTO.getCode());
		trainingDetails.setScore(trainingDTO.getScore());
		trainingDetails.setTimeSpent(trainingDTO.getTimeSpent());
		trainingDetails.setDateOfCompletion(trainingDTO.getDateOfCompletion());
		trainingDetails.setStatus(trainingDTO.getStatus());
		trainingRepo.save(trainingDetails);
		return trainingDetails;
	}

	// Get a particular Training Details using id
	public Training getTrainingDetailsById(Long id) throws ResourceNotFoundException {
		LOGGER.info("Check Training Details by Id :: getTrainingDetailsById");
		return Optional
				.of(trainingRepo.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("No Details are found with given id : " + id)))
				.get();
	}

	// Get all Training Details of an employee using employee id
	public List<Training> getAllTrainingDetailsByEmpId(Long employeeId) throws ResourceNotFoundException {
		List<Training> allCourses = trainingRepo.findAllByEmployeeId(employeeId);
		if (allCourses.isEmpty()) {
			LOGGER.error("No Course Training Details were found with given employee id - '" + employeeId
					+ "' :: getAllTrainingDetailsByEmpId");
			throw new ResourceNotFoundException(
					"No Course Training Details are found with given employee id : " + employeeId);
		}
		return allCourses;
	}

	// Get few Training Details of an employee using employee id and course name
	public List<Training> getAllTrainingDetailsByEmpIdAndName(Long employeeId, String courseName)
			throws ResourceNotFoundException {
		List<Training> allCourses = trainingRepo.findAllByEmployeeIdAndCourseName(employeeId, courseName);
		if (allCourses.isEmpty()) {
			LOGGER.error(
					"Employee : " + employeeId + ", No Course Training Details are found with given course name - '"
							+ courseName + "' :: getAllTrainingDetailsByEmpIdAndName");
			throw new ResourceNotFoundException("Employee : " + employeeId
					+ ", No Course Training Details are found with given course name - '" + courseName + "'");
		}
		return allCourses;
	}

	// Update a particular Training Details using id
	public Training updateTrainingDetails(TrainingDTO trainingDTO, Long id) throws ResourceNotFoundException {
		LOGGER.info("Check Training Details by Id :: updateTrainingDetails");
		Optional<Training> trainingDetails = Optional.of(trainingRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No Details are found with given id : " + id)));
		trainingDetails.get().setCourseName(trainingDTO.getCourseName());
		trainingDetails.get().setCode(trainingDTO.getCode());
		trainingDetails.get().setScore(trainingDTO.getScore());
		trainingDetails.get().setTimeSpent(trainingDTO.getTimeSpent());
		trainingDetails.get().setDateOfCompletion(trainingDTO.getDateOfCompletion());
		trainingDetails.get().setStatus(trainingDTO.getStatus());
		trainingRepo.save(trainingDetails.get());
		return trainingDetails.get();
	}

	// Delete a particular Training Details using id
	public void deleteTrainingDetailsById(Long id) throws ResourceNotFoundException {
		LOGGER.info("Check Training Details by Id :: deleteTrainingDetailsById");
		Optional<Training> trainingDetails = Optional.of(trainingRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No Details are found with given id : " + id)));
		trainingRepo.delete(trainingDetails.get());
	}

}
