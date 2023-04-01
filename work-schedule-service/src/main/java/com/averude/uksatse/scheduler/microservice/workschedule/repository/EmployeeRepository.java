package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;

@CacheConfig(cacheNames = "department_employees")
public interface EmployeeRepository extends IByDepartmentIdRepository<Employee, Long> {

    @Override
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
