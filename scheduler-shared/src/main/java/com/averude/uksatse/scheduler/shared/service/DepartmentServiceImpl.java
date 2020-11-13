package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.structure.Department;
import com.averude.uksatse.scheduler.shared.manager.ScheduleTablePartitionManager;
import com.averude.uksatse.scheduler.shared.manager.TablePartitionManager;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServiceImpl
        extends AService<Department, Long> implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final TablePartitionManager<Long> partitionManager;

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository,
                          ScheduleTablePartitionManager partitionManager){
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
        this.partitionManager = partitionManager;
    }

    @Override
    @Transactional
    public List<Department> findAllByEnterpriseId(Long enterpriseId) {
        return departmentRepository.findAllByEnterpriseId(enterpriseId);
    }

    @Override
    @Transactional
    public Optional<Department> findByShiftIt(Long shiftId) {
        return departmentRepository.findByShiftId(shiftId);
    }

    @Override
    public <S extends Department> S save(@Valid S department) {
        var savedDepartment = super.save(department);
        partitionManager.createPartition(savedDepartment.getId());
        return savedDepartment;
    }

    @Override
    public void deleteById(Long departmentId) {
        partitionManager.removePartition(departmentId);
        super.deleteById(departmentId);
    }

    @Override
    public void delete(Department department) {
        partitionManager.removePartition(department.getId());
        super.delete(department);
    }
}
