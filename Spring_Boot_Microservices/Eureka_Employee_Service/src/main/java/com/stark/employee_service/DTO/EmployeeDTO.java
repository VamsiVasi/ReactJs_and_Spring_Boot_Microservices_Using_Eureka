package com.stark.employee_service.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class EmployeeDTO {

	private String firstName;

	private String middleName;

	private String lastName;

	private LocalDate dateOfBirth;

	private String address;

}
