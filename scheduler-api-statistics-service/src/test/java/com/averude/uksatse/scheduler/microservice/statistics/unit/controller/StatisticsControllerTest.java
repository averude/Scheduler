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
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class StatisticsControllerTest {
    @Mock
    StatisticsService statisticsService;
    @Mock
    OAuth2Authentication authentication;
    @InjectMocks
    StatisticsControllerImpl sut;

    @Test
    public void testGetNumberOfEmployeesInPositionsByDepartmentId() {
        CountDTO countDTO = new CountDTO(1L, 1L);
        List<CountDTO> countDTOS = ImmutableList.of(countDTO);
        when(statisticsService.countEmployeesByAuth(authentication)).thenReturn(countDTOS);
        Iterable<CountDTO> result = sut
                .getNumberOfEmployeesInPositionsByDepartmentId(authentication);
        verify(statisticsService).countEmployeesByAuth(authentication);
        assertEquals(result, countDTOS);
    }
}