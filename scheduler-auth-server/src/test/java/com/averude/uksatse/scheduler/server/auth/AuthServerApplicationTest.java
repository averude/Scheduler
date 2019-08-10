package com.averude.uksatse.scheduler.server.auth;

import com.averude.uksatse.scheduler.core.entity.Authority;
import com.averude.uksatse.scheduler.core.entity.User;
import com.averude.uksatse.scheduler.shared.repository.AuthorityRepository;
import com.averude.uksatse.scheduler.server.auth.service.SchedulerUserDetailsService;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AuthServerApplicationTest {
    private static boolean initialized = false;

    @Autowired private WebApplicationContext    wac;
    @Autowired private FilterChainProxy         springSecurityFilterChain;

    @Autowired private SchedulerUserDetailsService userSerivce;
    @Autowired private AuthorityRepository authorityRepository;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        if (!initialized) {
            initTestData();
        }

        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.wac)
                .addFilter(springSecurityFilterChain)
                .build();
    }

    @Transactional
    void initTestData() {
        Authority depAdmin = new Authority();
        depAdmin.setName("DEPARTMENT_ADMIN");
        authorityRepository.save(depAdmin);

        Authority globAdmin = new Authority();
        globAdmin.setName("GLOBAL_ADMIN");

        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin");
        user.setDepartmentId(1L);
        user.addAuthority(depAdmin);
        authorityRepository.save(globAdmin);
        userSerivce.save(user);

        initialized = true;
    }

    private String obtainAccessToken(String name, String password) throws Exception {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("client_id", "browser");
        params.add("username", name);
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
        String accessToken = jsonParser.parseMap(resultString).get("access_token").toString();
        return accessToken;
    }

    @Test
    public void testCreateUser() throws Exception {
        String newUser = "{\"username\": \"andrew\", \"password\": \"123\", \"authorities\": [{\"id\": 2, \"name\":\"GLOBAL_ADMIN\"}]}";

        ResultActions result = mockMvc.perform(post("/users")
                .header("Authorization", "Bearer " + obtainAccessToken("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(newUser));

        System.out.println(result.andReturn().getResponse().getContentAsString());
    }

    @Test
    public void testGetUsers() throws Exception {
        ResultActions result = mockMvc.perform(get("/users")
                .header("Authorization", "Bearer " + obtainAccessToken("andrew", "123"))
                .contentType(MediaType.APPLICATION_JSON));

        System.out.println(result.andReturn().getResponse().getContentAsString());
    }

//    @Test
    public void testDeleteUser() throws Exception {
        ResultActions result = mockMvc.perform(delete("/users/2")
                .header("Authorization", "Bearer " + obtainAccessToken("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON));

        System.out.println(result.andReturn().getResponse().getContentAsString());
    }

    @Test
    public void testGetAllUsers() throws Exception {
        ResultActions result = mockMvc.perform(get("/users")
                .header("Authorization", "Bearer " + obtainAccessToken("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON));

        System.out.println(result.andReturn().getResponse().getContentAsString());
    }

//    @Test
    public void testUpdateUser() throws Exception {
        String updated = "{\"id\": \"2\", \"username\": \"andrew\", \"password\": \"123\", \"authorities\": [{\"id\": 2, \"name\":\"GLOBAL_ADMIN\"}]}";

        ResultActions result = mockMvc.perform(put("/users")
                .header("Authorization", "Bearer " + obtainAccessToken("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(updated));

        System.out.println(result.andReturn().getResponse().getContentAsString());

        testGetAllUsers();
    }

    @Test
    public void updateFewTimes() throws Exception {
        for (int i = 0; i < 10; i++) {
            testUpdateUser();
        }
    }

    @Test
    public void testGetAuthorities() throws Exception {
        ResultActions result = mockMvc.perform(get("/authorities")
                .header("Authorization", "Bearer " + obtainAccessToken("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON));

        System.out.println(result.andReturn().getResponse().getContentAsString());
    }
}
