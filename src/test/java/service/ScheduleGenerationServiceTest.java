package service;

import dao.DayTypeDAO;
import dao.ScheduleDAO;
import entity.DayType;
import entity.Schedule;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

public class ScheduleGenerationServiceTest {

    private static final Long EMPLOYEE_ID = 1L;
    private static final int NUM_OF_DAYS = 31;

    private ScheduleDAO scheduleDAO = mock(ScheduleDAO.class);
    private DayTypeDAO dayTypeDAO   = mock(DayTypeDAO.class);

    private List<DayType> dayTypes = Arrays.asList(
            new DayType(1L, "DAY", 12f),
            new DayType(2L, "BEFORE_NIGHT", 4f),
            new DayType(3L, "AFTER_NIGHT", 8f),
            new DayType(4L, "WEEKEND", 0f)
    );

    private ScheduleGenerationService service;

    @Before
    public void setUp(){
        service = new ScheduleGenerationServiceImpl(scheduleDAO, dayTypeDAO);
        when(dayTypeDAO.findByEmployeeId(EMPLOYEE_ID)).thenReturn(dayTypes);
    }

    @Test
    public void testGenerateSchedule(){
        LocalDate start = LocalDate.parse("2018-03-01");
        LocalDate stop  = start.plusDays(NUM_OF_DAYS - 1); //because we need 31th day
        service.generate(EMPLOYEE_ID, start, stop, 0);
        verify(scheduleDAO, times(NUM_OF_DAYS))
                .create(any(Schedule.class));
    }

}
