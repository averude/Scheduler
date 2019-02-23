package com.averude.uksatse.scheduler.microservice.admin.controller.unit.controller;

import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.microservice.admin.controller.DepartmentControllerImpl;
import com.averude.uksatse.scheduler.shared.service.DepartmentService;
import com.google.common.collect.ImmutableList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class DepartmentControllerTest {
    @Mock
    DepartmentService departmentService;
    @InjectMocks
    DepartmentControllerImpl sut;

    private Department department = new Department("Test department");

    @Test
    public void getAll() {
        when(departmentService.findAll())
                .thenReturn(ImmutableList.of(department));
        sut.getAll().forEach(value -> assertEquals(value.getName(), department.getName()));
        verify(departmentService).findAll();
    }

    @Test
    public void get() {
        when(departmentService.findById(anyLong()))
                .thenReturn(Optional.of(department));
        sut.get(1L).ifPresent(value -> assertEquals(value.getName(), department.getName()));
        verify(departmentService).findById(anyLong());
    }

    //@Test
    public void update() {

    }

    //@Test
    public void delete() {

    }
}