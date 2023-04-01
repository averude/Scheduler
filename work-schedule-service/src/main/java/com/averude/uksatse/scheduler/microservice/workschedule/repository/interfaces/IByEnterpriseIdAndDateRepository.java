package com.averude.uksatse.scheduler.microservice.workschedule.repository.interfaces;

import org.springframework.data.repository.NoRepositoryBean;

import java.time.LocalDate;
import java.util.List;

@NoRepositoryBean
public interface IByEnterpriseIdAndDateRepository<T, ID> extends IByEnterpriseIdRepository<T, ID> {
    List<T> findAllByEnterpriseIdAndDateBetween(Long enterpriseId, LocalDate from, LocalDate to);
}
