package com.averude.uksatse.scheduler.shared.repository.interfaces;

import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@NoRepositoryBean
public interface IByDepartmentIdAndDateRepository<T extends Serializable, ID> extends IByDepartmentIdRepository<T, ID> {
    List<T> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
}
