package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DepartmentIcon;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface DepartmentIconService extends GenericService<DepartmentIcon, Long> {
    Optional<DepartmentIcon> getIconByDepartmentId(Long departmentId);

    DepartmentIcon storeFile(MultipartFile multipartFile);

    Resource getFile(Long iconId);
}
