package com.averude.uksatse.scheduler.microservice.workschedule;

import com.averude.uksatse.scheduler.security.filter.CustomCorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.filter.CorsFilter;

@EnableAspectJAutoProxy
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EntityScan("com.averude.uksatse.scheduler.core.model.entity")
@SpringBootApplication
@ComponentScan(basePackages = {
        "com.averude.uksatse.scheduler.microservice.workschedule",
        "com.averude.uksatse.scheduler.core.configuration",
        "com.averude.uksatse.scheduler.core.json",
        "com.averude.uksatse.scheduler.core.creator",
        "com.averude.uksatse.scheduler.core.util",
        "com.averude.uksatse.scheduler.security.logging",
        "com.averude.uksatse.scheduler.core.errorhandler",
        "com.averude.uksatse.scheduler.statistics",
        "com.averude.uksatse.scheduler.security",
        "com.averude.uksatse.scheduler.generator",
        "com.averude.uksatse.scheduler.shared.manager",
        "com.averude.uksatse.scheduler.shared.service",
        "com.averude.uksatse.scheduler.shared.utils",
})
@EnableJpaRepositories("com.averude.uksatse.scheduler.shared.repository")
public class WorkScheduleServiceApplication {

    @Bean
    public FilterRegistrationBean customCorsFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean<CorsFilter>(new CustomCorsFilter());
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

    public static void main(String[] args) {
        SpringApplication.run(WorkScheduleServiceApplication.class, args);
    }
}
