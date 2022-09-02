package com.stark.employee_service.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Entity
@Table(name = "Employee")
@Data
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "First_Name")
	@NotNull(message = "Please enter your first name")
	@Pattern(regexp = "[A-Za-z]+( [A-Za-z]+)*", message = "First Name should contain only alphabets and space")
	private String firstName;

	@Column(name = "Middle_Name")
	private String middleName;

	@Column(name = "Last_Name")
	@NotNull(message = "Please enter your last name")
	@Pattern(regexp = "[A-Za-z]+( [A-Za-z]+)*", message = "Last Name should contain only alphabets and space")
	private String lastName;

	@Column(name = "DOB")
	@NotNull(message = "Please enter your DOB")
	@PastOrPresent(message = "Date of birth should be past or present date")
	private LocalDate dateOfBirth;

	@Column(name = "Address")
	@NotNull(message = "Please enter your Address")
	private String address;

}
