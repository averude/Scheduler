package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.DepartmentIconController;
import com.averude.uksatse.scheduler.core.entity.DepartmentIcon;
import com.averude.uksatse.scheduler.shared.service.DepartmentIconService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
public class DepartmentIconControllerImpl implements DepartmentIconController {
    private final DepartmentIconService departmentIconService;

    public DepartmentIconControllerImpl(DepartmentIconService departmentIconService) {
        this.departmentIconService = departmentIconService;
    }

    @Override
    public Iterable<DepartmentIcon> getAll() {
        return departmentIconService.findAll();
    }

    @Override
    public Optional<DepartmentIcon> get(Long id) {
        return departmentIconService.findById(id);
    }

    @Override
    public ResponseEntity<Resource> getIconFile(Long id) {
        Resource iconFile = departmentIconService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + iconFile.getFilename() + "\"")
                .body(iconFile);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        departmentIconService.deleteById(id);
        return new ResponseEntity<>("Entity with ID:" + id +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<DepartmentIcon> upload(MultipartFile file) {
        DepartmentIcon uploadedIcon = departmentIconService.storeFile(file);
        return ResponseEntity.ok().body(uploadedIcon);
    }
}
