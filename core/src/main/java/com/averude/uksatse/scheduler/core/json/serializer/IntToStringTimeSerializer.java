package com.averude.uksatse.scheduler.core.json.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class IntToStringTimeSerializer extends JsonSerializer<Integer> {

    @Override
    public void serialize(Integer integer,
                          JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jsonGenerator.writeObject(convertMinutesToString(integer));
    }

    private String convertMinutesToString(Integer minutes) {
        if (minutes == null || minutes == 0) {
            return "00:00";
        }

        if (minutes < 0) {
            throw new IllegalArgumentException("Minutes cannot be negative");
        }

        var hh = minutes / 60;
        var mm = minutes % 60;

        return (hh > 9 ? hh : "0" + hh) + ":" + (mm > 9 ? mm : "0" + mm);
    }
}
