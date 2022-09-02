package com.stark.employee_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stark.employee_service.entity.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

	Optional<Employee> findByFirstName(String firstName);

	List<Employee> findAllByFirstName(String firstName);

}
