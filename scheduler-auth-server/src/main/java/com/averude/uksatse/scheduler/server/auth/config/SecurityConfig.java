package com.averude.uksatse.scheduler.server.auth.config;

import com.averude.uksatse.scheduler.server.auth.service.SchedulerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor.*;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    SchedulerUserDetailsService schedulerUserDetailsService;

    @Bean
    public static BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**").authorizeRequests()
                .antMatchers("/users").hasAnyAuthority(GLOBAL_ADMIN, DEPARTMENT_ADMIN)
                .antMatchers("/authorities").hasAuthority(GLOBAL_ADMIN)
                .anyRequest().authenticated()
                .and().cors()
                .and().csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(schedulerUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
