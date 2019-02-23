package com.averude.uksatse.scheduler.microservice.statistics;

import com.averude.uksatse.scheduler.core.filters.DepartmentHeaderFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableDiscoveryClient
@EntityScan("com.averude.uksatse.scheduler.core.entity")
@SpringBootApplication(scanBasePackages = {
        "com.averude.uksatse.scheduler.shared.service",
        "com.averude.uksatse.scheduler.microservice.statistics",
        "com.averude.uksatse.scheduler.core.errorhandlers"
})
@EnableJpaRepositories(basePackages = "com.averude.uksatse.scheduler.shared.repository")
public class StatisticsServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(StatisticsServiceApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("GET", "PUT", "POST", "HEAD", "DELETE");
            }
        };
    }

    @Bean
    public FilterRegistrationBean departmentHeaderFilter() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new DepartmentHeaderFilter());
        return filterRegistrationBean;
    }
}
