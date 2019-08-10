package com.averude.uksatse.scheduler.monolith;

import com.averude.uksatse.scheduler.core.security.filter.CustomCorsFilter;
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
@EntityScan("com.averude.uksatse.scheduler.core.entity")
@SpringBootApplication(scanBasePackages = {
        "com.averude.uksatse.scheduler.monolith",
        "com.averude.uksatse.scheduler.core.extractor",
        "com.averude.uksatse.scheduler.core.configuration",
        "com.averude.uksatse.scheduler.core.generator",
        "com.averude.uksatse.scheduler.core.errorhandler",
        "com.averude.uksatse.scheduler.shared.service"
})
@EnableJpaRepositories("com.averude.uksatse.scheduler.shared.repository")
public class BackendServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendServerApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean customCorsFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean<CorsFilter>(new CustomCorsFilter());
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
