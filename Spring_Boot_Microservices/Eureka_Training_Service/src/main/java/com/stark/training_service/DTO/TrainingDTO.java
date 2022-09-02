package com.stark.training_service.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TrainingDTO {

	private long employeeId;
	
	private String courseName;

	private String code;

	private String score;

	private String timeSpent;

	private LocalDate dateOfCompletion;

	private String status;

}
