package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.DepartmentIcon;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface DepartmentIconController {
    @RequestMapping(method = RequestMethod.GET, value = "/admin/icons")
    Iterable<DepartmentIcon> getAll();

    @RequestMapping(method = RequestMethod.GET, value = "/admin/icons/{id}")
    Optional<DepartmentIcon> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.GET, value = "/admin/icons/{id}/file")
    ResponseEntity<Resource> getIconFile(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.DELETE, value = "/admin/icons/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST, value = "/admin/icons/upload")
    ResponseEntity<DepartmentIcon> upload(@RequestParam MultipartFile file);
}
