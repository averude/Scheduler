package com.averude.uksatse.scheduler.server.auth;

import com.averude.uksatse.scheduler.core.entity.Authority;
import com.averude.uksatse.scheduler.core.entity.User;
import com.averude.uksatse.scheduler.core.security.filter.CustomCorsFilter;
import com.averude.uksatse.scheduler.shared.repository.UserRepository;
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
@EntityScan(basePackageClasses = {User.class, Authority.class})
@SpringBootApplication(scanBasePackages = {
        "com.averude.uksatse.scheduler.core.extractor",
        "com.averude.uksatse.scheduler.server.auth"
})
@EnableJpaRepositories(basePackageClasses = {
        UserRepository.class
})
public class AuthServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthServerApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean customCorsFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean<CorsFilter>(new CustomCorsFilter());
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
