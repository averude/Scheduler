package com.averude.uksatse.scheduler.monolith;

import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.Enterprise;
import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.repository.EnterpriseRepository;
import com.averude.uksatse.scheduler.shared.repository.PositionRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BackendServerApplicationTest {
    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

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
        String enterprise = "{\"name\": \"Ent\"}";
        String department = "{\"name\": \"Test department\", \"enterpriseId\": \"1\"}";
        String dayTypeGroup = "{\"name\": \"Test dayTypeGroup\", \"color\": \"#000000\"}";
        String dayType = "{" +
                    "\"enterpriseId\": \"1\", " +
                    "\"dayTypeGroup\": {\"id\":\"1\",\"name\": \"Test dayTypeGroup\", \"color\": \"#000000\"}, " +
                    "\"name\":\"Test daytype\", " +
                    "\"label\": \"T\", " +
                    "\"usePreviousValue\": \"false\"" +
                "}";
        String depDayType = "{" +
                    "\"departmentId\": \"2\"," +
                    "\"dayType\": " +
                        "{" +
                            "\"id\": \"1\"," +
                            "\"enterpriseId\": \"1\", " +
                            "\"dayTypeGroup\": {\"id\":\"1\",\"name\": \"Test dayTypeGroup\", \"color\": \"#000000\"}, " +
                            "\"name\":\"Test daytype\", " +
                            "\"label\": \"T\", " +
                            "\"usePreviousValue\": \"false\"" +
                        "}," +
                    "\"startTime\": \"09:00\", " +
                    "\"endTime\": \"18:00\", " +
                    "\"breakStartTime\": \"10:00\", " +
                    "\"breakEndTime\": \"11:00\"}, " +
                "}";

        mockMvc.perform(post("/admin/enterprises")
                .content(enterprise)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));

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

        mockMvc.perform(post("/admin/department_day_types")
                .content(depDayType)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));

        mockMvc.perform(get("/admin/department_day_types/departments/2")
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
    public void testDeleteEmployee() throws Exception {
        var enterprise = new Enterprise();
        enterprise.setName("Test");
        enterpriseRepository.save(enterprise);

        var dep = new Department();
        dep.setName("Test");
        dep.setEnterpriseId(enterprise.getId());
        departmentRepository.save(dep);

        var pos = new Position();
        pos.setName("Test");
        pos.setDepartmentId(dep.getId());
        positionRepository.save(pos);

        var emp = new Employee();
        emp.setSecondName("Test");
        emp.setFirstName("Test");
        emp.setPatronymic("Test");
        emp.setPosition(pos);
        employeeRepository.save(emp);

        mockMvc.perform(delete("/admin/employees/" + emp.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));
    }

//    @Autowired
//    private DayTypeGroupRepository  dayTypeGroupRepository;
//    @Autowired
//    private DayTypeRepository       dayTypeRepository;
//
//    @Test
//    public void testTwoFields() {
//        var enterprise = new Enterprise();
//        enterprise.setName("Test");
//        enterpriseRepository.save(enterprise);
//
//        var dep = new Department();
//        dep.setName("Test");
//        dep.setEnterpriseId(enterprise.getId());
//        departmentRepository.save(dep);
//
//        var group = new DayTypeGroup();
//        group.setName("Test group");
//        group.setColor("#000000");
//        dayTypeGroupRepository.save(group);
//
//        var dayType = new DayType();
//        dayType.setDayTypeGroup(group);
//        dayType.setName("Test day type");
//        dayType.setLabel("T");
//        dayType.setUsePreviousValue(false);
//        dayType.setEnterpriseId(enterprise.getId());
//        dayTypeRepository.save(dayType);
//        System.out.println(dayType);
//    }
}
