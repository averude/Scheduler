package com.averude.uksatse.scheduler.microservice.workschedule.service;

import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import com.averude.uksatse.scheduler.shared.manager.ScheduleTablePartitionManager;
import com.averude.uksatse.scheduler.shared.manager.TablePartitionManager;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;

@Service
public class DepartmentServiceImpl
        extends AService<Department, Long> implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final TablePartitionManager<Long> partitionManager;

    @Autowired
    public DepartmentServiceImpl(DepartmentRepository departmentRepository,
                                 ScheduleTablePartitionManager partitionManager){
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
        this.partitionManager = partitionManager;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Department> findAllByEnterpriseId(Long enterpriseId) {
        return departmentRepository.findAllByEnterpriseId(enterpriseId);
    }

    @Override
    @Transactional
    public <S extends Department> S save(@Valid S department) {
        if (department.getId() == null) {
            var savedDepartment = super.save(department);
            partitionManager.createPartition(savedDepartment.getId());
            return savedDepartment;
        } else {
            return super.save(department);
        }
    }

    @Override
    @Transactional
    public void deleteById(Long departmentId) {
        partitionManager.removePartition(departmentId);
        super.deleteById(departmentId);
    }

    @Override
    @Transactional
    public void delete(Department department) {
        partitionManager.removePartition(department.getId());
        super.delete(department);
    }
}
