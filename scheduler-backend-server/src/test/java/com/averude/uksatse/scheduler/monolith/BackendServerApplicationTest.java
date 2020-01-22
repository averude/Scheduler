package com.averude.uksatse.scheduler.monolith;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.shared.repository.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BackendServerApplicationTest {
    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.wac)
                .build();
    }

    @Test
    public void testPostGetDeleteDepartment() throws Exception {
        String department = "{\"name\": \"Test department\"}";
        String dayTypeGroup = "{\"name\": \"Test dayTypeGroup\", \"color\": \"#000000\"}";
        String dayType = "{\"departmentId\": \"1\", " +
                "\"dayTypeGroupId\": \"1\", " +
                "\"name\":\"Test daytype\", " +
                "\"label\": \"T\", " +
                "\"startTime\": \"09:00\", " +
                "\"endTime\": \"18:00\", " +
                "\"breakStartTime\": \"10:00\", " +
                "\"breakEndTime\": \"11:00\", " +
                "\"usePreviousValue\": \"false\"" +
                "}";

        mockMvc.perform(post("/admin/departments")
                .content(department)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));

        mockMvc.perform(post("/admin/day_type_groups")
                .content(dayTypeGroup)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));

        mockMvc.perform(post("/admin/day_types")
                .content(dayType)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));

        mockMvc.perform(get("/admin/day_types/1")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));

        mockMvc.perform(delete("/admin/day_types/1")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));
    }

    @Test
    @Sql(value = "/2-database-create-tables.sql")
    public void testDeleteEmployee() throws Exception {
        Department dep = new Department();
        dep.setName("Test");
        departmentRepository.save(dep);

        Position pos = new Position();
        pos.setName("Test");
        pos.setDepartmentId(dep.getId());
        positionRepository.save(pos);

        Employee emp = new Employee();
        emp.setSecondName("Test");
        emp.setFirstName("Test");
        emp.setPatronymic("Test");
        emp.setPositionId(pos.getId());
        employeeRepository.save(emp);

        mockMvc.perform(delete("/admin/employees/" + emp.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));
    }
}
