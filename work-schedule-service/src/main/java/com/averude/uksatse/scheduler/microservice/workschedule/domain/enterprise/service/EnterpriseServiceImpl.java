package com.averude.uksatse.scheduler.microservice.workschedule.domain.enterprise.service;

import com.averude.uksatse.scheduler.core.model.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.EnterpriseRepository;
import com.averude.uksatse.scheduler.shared.manager.ScheduleTablePartitionManager;
import com.averude.uksatse.scheduler.shared.manager.TablePartitionManager;
import com.averude.uksatse.scheduler.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnterpriseServiceImpl
        extends AService<Enterprise, Long> implements EnterpriseService {

    private final EnterpriseRepository enterpriseRepository;
    private final TablePartitionManager<Long> partitionManager;

    @Autowired
    public EnterpriseServiceImpl(EnterpriseRepository enterpriseRepository,
                                 ScheduleTablePartitionManager partitionManager) {
        super(enterpriseRepository);
        this.enterpriseRepository = enterpriseRepository;
        this.partitionManager = partitionManager;
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        enterpriseRepository.getAllDepartmentIdsById(id)
                .forEach(partitionManager::removePartition);
        super.deleteById(id);
    }

    @Override
    @Transactional
    public void delete(Enterprise enterprise) {
        enterpriseRepository.getAllDepartmentIdsById(enterprise.getId())
                .forEach(partitionManager::removePartition);
        super.delete(enterprise);
    }
}
