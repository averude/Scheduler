package app;

import filters.DepartmentHeaderFilter;
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
@EntityScan("entity")
@SpringBootApplication(scanBasePackages = {"service", "controller", "errorhandlers"})
@EnableJpaRepositories(basePackages = "repository")
public class StatisticsService {
    public static void main(String[] args) {
        SpringApplication.run(StatisticsService.class, args);
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
        filterRegistrationBean.setOrder(1);
        return filterRegistrationBean;
    }
}
