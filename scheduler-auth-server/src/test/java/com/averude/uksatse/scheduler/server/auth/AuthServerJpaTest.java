package com.averude.uksatse.scheduler.server.auth;

import com.averude.uksatse.scheduler.core.entity.structure.Department;
import com.averude.uksatse.scheduler.core.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AuthServerJpaTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Test
    public void testEntityManager() {
        var enterprise = new Enterprise();
        enterprise.setName("Test ent");
        entityManager.persistAndFlush(enterprise);

        var department = new Department();
        department.setName("Test dep");
        department.setEnterpriseId(enterprise.getId());
        entityManager.persistAndFlush(department);

        var userAccount = new DepartmentAdminUserAccount();
        userAccount.setUsername("testuser");
        userAccount.setPassword("testpass");
        userAccount.setDepartmentId(department.getId());
        entityManager.persistAndFlush(userAccount);

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
        System.out.println("THIS");
        System.out.println(depAdmins);
        for (var acc : depAdmins) {
            System.out.println(acc);
        }
    }
}
