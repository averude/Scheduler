package com.averude.uksatse.scheduler.core.converters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.List;

@Converter
public class ListStringConverter implements AttributeConverter<List<String>, String> {
    @Override
    public String convertToDatabaseColumn(List<String> strings) {
        return strings == null || strings.isEmpty() ? null : String.join(", ", strings);
    }

    @Override
    public List<String> convertToEntityAttribute(String s) {
        return s == null || s.isEmpty() || s.isBlank() ? null : Arrays.asList(s.split(", "));
    }
}
