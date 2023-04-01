package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.config;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy.CalculationStrategy;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class StatisticsConfig {

    @Bean
    @Qualifier("calculationStrategies")
    public Map<String, CalculationStrategy> calculationStrategies(List<CalculationStrategy> calculationStrategyList) {
        var strategies = new HashMap<String, CalculationStrategy>();
        calculationStrategyList.forEach(strategy -> strategies.put(strategy.getName(), strategy));
        return strategies;
    }
}
