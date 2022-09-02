package com.stark.training_service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stark.training_service.entity.Training;

@Repository
public interface TrainingRepository extends CrudRepository<Training, Long> {

	List<Training> findAllByEmployeeId(Long id);

	List<Training> findAllByEmployeeIdAndCourseName(Long employeeId, String courseName);

}
