package com.averude.uksatse.scheduler.core.json.deserializer;

import com.averude.uksatse.scheduler.core.exception.JsonTimeStringDeserializeException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.regex.Pattern;

@Component
public class StringToIntTimeDeserializer extends JsonDeserializer<Integer> {

    private Pattern pattern;
    private static final String TIME24HOURS_PATTERN = "([01]?[0-9]|2[0-4]):[0-5][0-9]";

    public StringToIntTimeDeserializer() {
        pattern = Pattern.compile(TIME24HOURS_PATTERN);
    }

    @Override
    public Integer deserialize(JsonParser jsonParser,
                               DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        return convertTimeStringToMinutes(jsonParser.getText());
    }

    private Integer convertTimeStringToMinutes(String time) {
        if (pattern.matcher(time).matches()) {
            var timeParts = time.split(":");
            var hh = Integer.parseInt(timeParts[0]);
            var mm = Integer.parseInt(timeParts[1]);
            return hh * 60 + mm;
        } else throw new JsonTimeStringDeserializeException("Wrong format of time string");
    }
}
