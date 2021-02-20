package com.averude.uksatse.scheduler.core.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.AttributeConverter;

@Slf4j
public abstract class JsonObjectConverter<T> implements AttributeConverter<T, String> {

    protected final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(T t) {
        if (t == null) {
            return null;
        }

        String objectJsonString = null;

        try {
            objectJsonString = mapper.writeValueAsString(t);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
        }

        return objectJsonString;
    }
}
