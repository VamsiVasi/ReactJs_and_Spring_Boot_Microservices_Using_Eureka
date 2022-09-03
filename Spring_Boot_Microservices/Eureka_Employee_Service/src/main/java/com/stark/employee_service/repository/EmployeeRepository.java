package com.stark.employee_service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stark.employee_service.entity.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

	List<Employee> findAllByFirstName(String firstName);

	List<Employee> findAllByMiddleName(String middleName);

	List<Employee> findAllByLastName(String lastName);

}
