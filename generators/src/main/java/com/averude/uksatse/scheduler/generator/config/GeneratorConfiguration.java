package com.averude.uksatse.scheduler.generator.config;

import com.averude.uksatse.scheduler.generator.schedule.processor.PatternRuleProcessor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class GeneratorConfiguration {

    @Bean
    @Qualifier("patternRuleProcessorMap")
    public Map<String, PatternRuleProcessor> patternRuleProcessorMap(List<PatternRuleProcessor> patternRuleProcessors) {
        var result = new HashMap<String, PatternRuleProcessor>();
        patternRuleProcessors.forEach(processor -> result.put(processor.getType(), processor));
        return result;
    }
}
