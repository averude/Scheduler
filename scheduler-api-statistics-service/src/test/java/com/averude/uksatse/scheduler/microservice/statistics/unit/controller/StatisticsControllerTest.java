package com.averude.uksatse.scheduler.microservice.statistics.unit.controller;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import com.averude.uksatse.scheduler.microservice.statistics.controller.StatisticsControllerImpl;
import com.averude.uksatse.scheduler.shared.service.StatisticsService;
import com.google.common.collect.ImmutableList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.anyLong;

@RunWith(MockitoJUnitRunner.class)
public class StatisticsControllerTest {
    @Mock
    StatisticsService statisticsService;
    @InjectMocks
    StatisticsControllerImpl sut;

    @Test
    public void testGetNumberOfEmployeesInPositionsByDepartmentId() {
        CountDTO countDTO = new CountDTO(1L, 1L);
        List<CountDTO> countDTOS = ImmutableList.of(countDTO);
        when(statisticsService.countEmployeesByDepartmentId(anyLong())).thenReturn(countDTOS);
        Iterable<CountDTO> result = sut.getNumberOfEmployeesInPositionsByDepartmentId(1L);
        verify(statisticsService).countEmployeesByDepartmentId(1L);
        assertEquals(result, countDTOS);
    }
}