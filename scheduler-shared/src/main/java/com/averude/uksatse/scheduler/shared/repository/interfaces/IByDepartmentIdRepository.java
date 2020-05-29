package com.averude.uksatse.scheduler.shared.repository.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface IByDepartmentIdRepository<T, ID> extends JpaRepository<T, ID> {
    List<T> findAllByDepartmentId(Long departmentId);
}
