package com.averude.uksatse.scheduler.server.auth.config;

import com.averude.uksatse.scheduler.security.creator.UserDetailsCreator;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.averude.uksatse.scheduler.security.authority.Authorities.DEPARTMENT_ADMIN;
import static com.averude.uksatse.scheduler.security.authority.Authorities.GLOBAL_ADMIN;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserAccountDetailsService userAccountDetailsService;

    @Bean
    public static BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**").authorizeRequests()
                .antMatchers("/users").hasAnyAuthority(GLOBAL_ADMIN, DEPARTMENT_ADMIN)
                .anyRequest().authenticated()
                .and().cors()
                .and().csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userAccountDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    @Qualifier("detailsCreatorMap")
    public Map<Class, UserDetailsCreator> detailsCreatorMap(List<UserDetailsCreator> creators) {
        var detailsCreatorMap = new HashMap<Class, UserDetailsCreator>(4);
        creators.forEach(userDetailsCreator -> detailsCreatorMap.put(userDetailsCreator.getUserAccountClass(), userDetailsCreator));
        return detailsCreatorMap;
    }
}
