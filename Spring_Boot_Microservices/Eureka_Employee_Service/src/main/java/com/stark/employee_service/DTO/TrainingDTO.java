package com.stark.employee_service.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TrainingDTO {
	
	private long id;

	private long employeeId;

	private String courseName;

	private String code;

	private String score;

	private String timeSpent;

	private LocalDate dateOfCompletion;

	private String status;

}