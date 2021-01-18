package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.shared.manager.ScheduleTablePartitionManager;
import com.averude.uksatse.scheduler.shared.manager.TablePartitionManager;
import com.averude.uksatse.scheduler.shared.repository.EnterpriseRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void deleteById(Long id) {
        enterpriseRepository.getAllDepartmentIdsById(id)
                .forEach(partitionManager::removePartition);
        super.deleteById(id);
    }

    @Override
    public void delete(Enterprise enterprise) {
        enterpriseRepository.getAllDepartmentIdsById(enterprise.getId())
                .forEach(partitionManager::removePartition);
        super.delete(enterprise);
    }
}
