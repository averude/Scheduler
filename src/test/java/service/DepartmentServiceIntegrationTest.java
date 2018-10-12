package service;

import config.HibernateConf;
import config.ValidationConf;
import entity.Department;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Collection;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {HibernateConf.class, ValidationConf.class})
@WebAppConfiguration
public class DepartmentServiceIntegrationTest {

    @Autowired
    private DepartmentService departmentService;

    @Test
    public void testCreate() {
        String depName = "Name";
        Department department = new Department();
        department.setName(depName);
        departmentService.create(department);
        assertNotNull(department.getId());
        assertNotNull(department.getName());
        assertEquals(department.getName(), depName);
    }

    @Test
    public void testFindAll() {
        String depName = "Name 2";
        Department department = new Department();
        department.setName(depName);
        departmentService.create(department);
        Collection<Department> collection = departmentService.findAll();
        assertFalse(collection.isEmpty());
        assertNotNull(collection);
        System.out.println(collection.size());
    }

    @Test
    public void testDelete() {
        String depName = "Name 3";
        Department department = new Department();
        department.setName(depName);
        departmentService.create(department);
        departmentService.deleteById(department.getId());
    }
}