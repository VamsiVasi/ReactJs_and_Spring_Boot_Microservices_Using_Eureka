package com.stark.training_service.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Entity
@Table(name = "Training")
@Data
public class Training {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "Employee_Id")
	private long employeeId;

	@Column(name = "Course_Name")
	@NotNull(message = "Please enter your Course Name")
	private String courseName;

	@Column(name = "Code")
	@NotNull(message = "Please enter your Code")
	private String code;

	@Column(name = "Score")
	@NotNull(message = "Please enter your Score")
	@Pattern(regexp = "(^100%$|^100.00%$|^100.00$|^[0-9]{0,2}([.][0-9]{1,2})? *%?$)[ ]*", message = "Format : 100.00 or 100.00%")
	private String score;

	@Column(name = "Time_Spent")
	@NotNull(message = "Please enter your time spent for the course")
	@Pattern(regexp = "(^24[h|H]$|^(([01]?[0-9]|2[0-3])[h|H]? *)?([0-5][0-9][m|M])?[ ]* ?$) *", message = "Format : 23h 59m or 24h or 59m")
	private String timeSpent;

	@Column(name = "Date_Of_Completion")
	@NotNull(message = "Please enter the Date Of Completion")
	private LocalDate dateOfCompletion;

	@Column(name = "Status")
	@NotNull(message = "Please enter your status of your course")
	@Pattern(regexp = "(([C|c][O|o][M|m][P|p][L|l][E|e][T|t][E|e][D|d])|([S|s][T|t][A|a][R|r][T|t][E|e][D|d])|([P|p][E|e][N|n][D|d][I|i][N|n][G|g]))[ ]*", message = "i.e completed/started/pending")
	private String status;

}
