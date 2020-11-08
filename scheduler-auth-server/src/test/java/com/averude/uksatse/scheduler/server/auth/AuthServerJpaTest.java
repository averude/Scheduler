package com.averude.uksatse.scheduler.server.auth;

import com.averude.uksatse.scheduler.core.entity.structure.Department;
import com.averude.uksatse.scheduler.core.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.Cache;
import javax.persistence.EntityManagerFactory;

import static org.junit.Assert.*;

@Slf4j
@RunWith(SpringRunner.class)
@DataJpaTest
public class AuthServerJpaTest {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    private UserAccountRepository userAccountRepository;

    private void prepareData() {
        var entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        var enterprise = new Enterprise();
        enterprise.setName("Test ent");
        entityManager.persist(enterprise);

        var department = new Department();
        department.setName("Test dep");
        department.setEnterpriseId(enterprise.getId());
        entityManager.persist(department);

        var userAccount = new DepartmentAdminUserAccount();
        userAccount.setUsername("testuser");
        userAccount.setPassword("testpass");
        userAccount.setRole("ADMIN");
        userAccount.setDepartmentId(department.getId());
        entityManager.persist(userAccount);

        entityManager.flush();
        entityManager.getTransaction().commit();
        entityManager.close();
    }

    @Test
    public void testEntityManager() {
        prepareData();

        var account = userAccountRepository.findById("testuser")
                .map(value -> (DepartmentAdminUserAccount) value)
                .get();
        assertEquals(account.getDepartmentId().longValue(), 1L);
        assertEquals(account.getUsername(), "testuser");

        var accounts = userAccountRepository.findAll();
        for (var acc : accounts) {
            assertEquals(acc.getClass(), DepartmentAdminUserAccount.class);
        }

        var depAdmins = userAccountRepository.findAllByEnterpriseId(1L);
        System.out.println(depAdmins);
        for (var acc : depAdmins) {
            System.out.println(acc);
        }

        testCache();
    }

    @SneakyThrows
    private void testCache() {
        log.info("Cache test");
        Cache cache = entityManagerFactory.getCache();

        var entityManager = entityManagerFactory.createEntityManager();

        entityManager.getTransaction().begin();
        UserAccount testuser = entityManager.find(UserAccount.class, "testuser");
        System.out.println(testuser);
        entityManager.getTransaction().commit();
        entityManager.close();

        assertTrue(cache.contains(UserAccount.class, "testuser"));
        log.info("5 sec sleep...");
        Thread.sleep(500);
        assertFalse(cache.contains(UserAccount.class, "testuser"));

        entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        testuser = entityManager.find(UserAccount.class, "testuser");
        System.out.println(testuser);
        entityManager.getTransaction().commit();
        entityManager.close();

        assertTrue(cache.contains(UserAccount.class, "testuser"));

        entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        testuser = entityManager.find(UserAccount.class, "testuser");
        System.out.println(testuser);
        entityManager.getTransaction().commit();
        entityManager.close();
    }
}
