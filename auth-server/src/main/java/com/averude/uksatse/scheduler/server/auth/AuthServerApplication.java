package com.averude.uksatse.scheduler.server.auth;

import com.averude.uksatse.scheduler.security.filter.CustomCorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.filter.CorsFilter;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@SpringBootApplication(scanBasePackages = {
        "com.averude.uksatse.scheduler.server.auth",
        "com.averude.uksatse.scheduler.security.config",
        "com.averude.uksatse.scheduler.security.controller.base",
        "com.averude.uksatse.scheduler.security.logging"
})
@EntityScan(basePackages = {
        "com.averude.uksatse.scheduler.security.model.entity",
        "com.averude.uksatse.scheduler.core.model.entity"
})
@EnableJpaRepositories({
        "com.averude.uksatse.scheduler.server.auth.repository",
        "com.averude.uksatse.scheduler.shared.repository"
})
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
