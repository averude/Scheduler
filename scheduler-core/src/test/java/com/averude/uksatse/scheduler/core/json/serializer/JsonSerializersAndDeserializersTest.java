package com.averude.uksatse.scheduler.core.json.serializer;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;

public class JsonSerializersAndDeserializersTest {
    private String dayTypeJsonString = "{" +
            "\"id\":1," +
            "\"departmentId\":1," +
            "\"dayTypeGroupId\":1," +
            "\"name\":\"Test\"," +
            "\"label\":\"T\"," +
            "\"startTime\":\"08:00\"," +
            "\"breakStartTime\":\"10:00\"," +
            "\"breakEndTime\":\"11:00\"," +
            "\"endTime\":\"16:45\"," +
            "\"usePreviousValue\":false" +
            "}";
    private ObjectMapper om = new ObjectMapper();

    @Test
    public void testSerializer() throws IOException {
        DayType dayType = new DayType();
        dayType.setId(1L);
        dayType.setDepartmentId(1L);
        dayType.setDayTypeGroupId(1L);
        dayType.setName("Test");
        dayType.setLabel("T");
        dayType.setStartTime(480);
        dayType.setBreakStartTime(600);
        dayType.setBreakEndTime(660);
        dayType.setEndTime(1005);
        dayType.setUsePreviousValue(false);
        String jsonString = om.writeValueAsString(dayType);
        assertEquals(jsonString, dayTypeJsonString);
    }

    @Test
    public void testDeserializer() throws IOException {
        DayType dayType = om.readValue(dayTypeJsonString, DayType.class);
        assertEquals(dayType.getBreakStartTime().intValue(), 600);
        assertEquals(dayType.getBreakEndTime().intValue(), 660);
        assertEquals(dayType.getStartTime().intValue(), 480);
        assertEquals(dayType.getEndTime().intValue(), 1005);
    }
}
