package com.averude.uksatse.scheduler.server.auth;

import com.averude.uksatse.scheduler.core.entity.structure.Department;
import com.averude.uksatse.scheduler.core.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.GlobalAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import lombok.SneakyThrows;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import javax.persistence.EntityManager;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthServerControllerTest {

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FilterChainProxy springSecurityFilterChain;

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    EntityManager entityManager;

    MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac)
                .addFilter(springSecurityFilterChain)
                .build();

        var enterprise = new Enterprise();
        enterprise.setName("Test ent");
        entityManager.persist(enterprise);

        var department = new Department();
        department.setName("Test dep");
        department.setEnterpriseId(enterprise.getId());
        entityManager.persist(department);

        var shift = new Shift();
        shift.setName("Test shift");
        shift.setDepartmentId(department.getId());
        entityManager.persist(shift);

        var globalAdmin = new GlobalAdminUserAccount();
        globalAdmin.setIsGlobalAdmin(true);
        globalAdmin.setUsername("global");
        globalAdmin.setPassword(passwordEncoder.encode("1234"));
        userAccountRepository.save(globalAdmin);

        var departmentAdmin = new DepartmentAdminUserAccount();
        departmentAdmin.setUsername("depadmin");
        departmentAdmin.setPassword(passwordEncoder.encode("1234"));
        departmentAdmin.setDepartmentId(department.getId());

        userAccountRepository.save(departmentAdmin);

        var shiftAdmin = new ShiftAdminUserAccount();
        shiftAdmin.setUsername("shadmin");
        shiftAdmin.setPassword(passwordEncoder.encode("1234"));
        shiftAdmin.setShiftId(1L);

        userAccountRepository.save(shiftAdmin);
    }

    @Test
    @SneakyThrows
    public void testGetUser() {
        String accessToken = obtainAccessToken("global", "1234");

        mockMvc.perform(get("/users")
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(mvcResult -> System.out.println(mvcResult.getResponse().getContentAsString()));

        mockMvc.perform(get("/current")
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(mvcResult -> {
                    System.out.println("-----CURRENT-------");
                    System.out.println(mvcResult.getResponse().getContentAsString());
                });
    }

    private String obtainAccessToken(String username, String password) throws Exception {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("client_id", "browser");
        params.add("username", username);
        params.add("password", password);

        ResultActions result
                = mockMvc.perform(post("/oauth/token")
                .params(params)
                .with(httpBasic("browser", "secret"))
                .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultString = result.andReturn().getResponse().getContentAsString();

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resultString).get("access_token").toString();
    }
}
