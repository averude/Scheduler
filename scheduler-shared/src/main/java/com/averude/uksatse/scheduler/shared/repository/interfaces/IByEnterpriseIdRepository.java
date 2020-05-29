package com.averude.uksatse.scheduler.shared.repository.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface IByEnterpriseIdRepository<T, ID> extends JpaRepository<T, ID> {
    List<T> findAllByEnterpriseId(Long enterpriseId);
}
