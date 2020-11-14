package com.averude.uksatse.scheduler.server.auth;

import com.averude.uksatse.scheduler.security.filter.CustomCorsFilter;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.filter.CorsFilter;

@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
@SpringBootApplication(scanBasePackages = {
        "com.averude.uksatse.scheduler.server.auth",
        "com.averude.uksatse.scheduler.security.creator"
})
@EntityScan(basePackages = {
        "com.averude.uksatse.scheduler.security.entity",
        "com.averude.uksatse.scheduler.core.entity"
})
@EnableJpaRepositories(basePackageClasses = {UserAccountRepository.class})
public class AuthServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthServerApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean customCorsFilter() {
        var bean = new FilterRegistrationBean<CorsFilter>(new CustomCorsFilter());
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
