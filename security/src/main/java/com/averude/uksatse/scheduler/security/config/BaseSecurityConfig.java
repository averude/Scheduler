package com.averude.uksatse.scheduler.security.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Configuration
public class BaseSecurityConfig {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ResourceLoader resourceLoader;

    @Bean
    public HashMap<String, HashMap<String, List<String>>> accessMap() throws IOException {
        var resource = resourceLoader.getResource("classpath:access-list.json");
        var typeReference = new TypeReference<HashMap<String, HashMap<String, List<String>>>>() {};
        var map = objectMapper.readValue(resource.getInputStream(), typeReference);
        log.info("Loaded access map from json: {}",map);
        return map;
    }
}
