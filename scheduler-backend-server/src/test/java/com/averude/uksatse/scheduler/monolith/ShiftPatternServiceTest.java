package com.averude.uksatse.scheduler.monolith;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.shared.repository.DayTypeGroupRepository;
import com.averude.uksatse.scheduler.shared.repository.DayTypeRepository;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.EnterpriseRepository;
import com.averude.uksatse.scheduler.shared.service.ShiftPatternService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ShiftPatternServiceTest {

    private ObjectMapper objectMapper = new ObjectMapper();
    {
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
    }

    @Autowired EntityManager entityManager;

    @Autowired EnterpriseRepository enterpriseRepository;
    @Autowired DepartmentRepository departmentRepository;
    @Autowired DayTypeGroupRepository dayTypeGroupRepository;
    @Autowired DayTypeRepository dayTypeRepository;

    @Autowired
    ShiftPatternService shiftPatternService;

    @Test
    public void test() {
        var group = new DayTypeGroup();
        group.setName("Test group");
        group.setColor("sdfsdf");
        dayTypeGroupRepository.save(group);

        var enterprise = new Enterprise();
        enterprise.setName("Test ent");
        enterpriseRepository.save(enterprise);

        var department = new Department();
        department.setEnterpriseId(enterprise.getId());
        department.setName("Test dep");
        departmentRepository.save(department);

        var dayType = new DayType();
        dayType.setEnterpriseId(enterprise.getId());
        dayType.setName("Test day type");
        dayType.setDayTypeGroup(group);
        dayTypeRepository.save(dayType);

        var shiftPattern = new ShiftPattern();
        shiftPattern.setName("Test pattern");
        shiftPattern.setDepartmentId(department.getId());

        var sequence = new ArrayList<PatternUnit>();
        sequence.add(new PatternUnit(null, 1L, dayType.getId()));
        var dto = new BasicDto<>(shiftPattern, sequence);
        shiftPatternService.saveDto(dto);

        printJson(shiftPatternService.findAllDtoByDepartmentId(department.getId()));

        var shiftPattern2 = new ShiftPattern();
        shiftPattern2.setId(1L);
        shiftPattern2.setName("Test pattern");
        shiftPattern2.setDepartmentId(department.getId());

        var seq = (List<PatternUnit>) sequence.clone();
        seq.add(new PatternUnit(null, 2L, dayType.getId()));
        dto = new BasicDto<>(shiftPattern2, seq);
        shiftPatternService.saveDto(dto);

        printJson(shiftPatternService.findAllDtoByDepartmentId(department.getId()));

        seq.remove(0);
        shiftPatternService.saveDto(dto);
        printJson(shiftPatternService.findAllDtoByDepartmentId(department.getId()));
    }

    private void printJson(Object o){
        try {
            System.out.println(objectMapper.writeValueAsString(o));
        } catch (JsonProcessingException e) {
            throw new RuntimeException();
        }
    }
}
