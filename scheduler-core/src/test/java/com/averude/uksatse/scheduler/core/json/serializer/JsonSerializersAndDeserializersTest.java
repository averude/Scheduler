package com.averude.uksatse.scheduler.core.json.serializer;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

public class JsonSerializersAndDeserializersTest {
    private String dayTypeJsonString = "{" +
            "\"id\":1," +
            "\"departmentId\":1," +
            "\"dayType\":null," +
            "\"startTime\":\"08:00\"," +
            "\"breakStartTime\":\"10:00\"," +
            "\"breakEndTime\":\"11:00\"," +
            "\"endTime\":\"16:45\"" +
            "}";
    private ObjectMapper om = new ObjectMapper();

//    @Test
    public void testSerializer() throws IOException {
        DepartmentDayType departmentDayType = new DepartmentDayType();
        departmentDayType.setId(1L);
        departmentDayType.setDepartmentId(1L);
        departmentDayType.setStartTime(480);
        departmentDayType.setBreakStartTime(600);
        departmentDayType.setBreakEndTime(660);
        departmentDayType.setEndTime(1005);
        String jsonString = om.writeValueAsString(departmentDayType);
        assertEquals(jsonString, dayTypeJsonString);
    }

//    @Test
    public void testDeserializer() throws IOException {
        DepartmentDayType departmentDayType = om.readValue(dayTypeJsonString, DepartmentDayType.class);
        assertEquals(departmentDayType.getBreakStartTime().intValue(), 600);
        assertEquals(departmentDayType.getBreakEndTime().intValue(), 660);
        assertEquals(departmentDayType.getStartTime().intValue(), 480);
        assertEquals(departmentDayType.getEndTime().intValue(), 1005);
    }
}
