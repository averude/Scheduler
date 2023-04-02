package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.entity.Employee;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@CacheConfig(cacheNames = "department_employees")
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByDepartmentId(Long departmentId);

    @Cacheable(key = "#departmentId")
    List<Employee> findAllByDepartmentIdOrderById(Long departmentId);

    @Override
    @CacheEvict(key = "#entity.departmentId")
    <S extends Employee> S save(S entity);

    @Override
    @CacheEvict(key = "#entity.departmentId")
    void delete(Employee entity);
}
