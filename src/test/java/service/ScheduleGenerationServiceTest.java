package service;

import dao.DayTypeDAO;
import dao.ScheduleDAO;
import entity.DayType;
import entity.Schedule;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class ScheduleGenerationServiceTest {

    private static final Long EMPLOYEE_ID   = 1L;
    private static final int NUM_OF_DAYS    = 31;
    private static final int OFFSET         = 0;

    private LocalDate start = LocalDate.parse("2018-03-01");
    private LocalDate stop  = start.plusDays(NUM_OF_DAYS - 1); //because we need 31th day

    private ScheduleDAO scheduleDAO = mock(ScheduleDAO.class);
    private DayTypeDAO dayTypeDAO   = mock(DayTypeDAO.class);

    private List<DayType> dayTypes = Arrays.asList(
            new DayType(1L, "DAY", 12f),
            new DayType(2L, "BEFORE_NIGHT", 4f),
            new DayType(3L, "AFTER_NIGHT", 8f),
            new DayType(4L, "WEEKEND", 0f)
    );

    private List<Schedule> storedSchedules = Arrays.asList(
            new Schedule(EMPLOYEE_ID, false, 8f, start),
            new Schedule(EMPLOYEE_ID, false, 8f, stop)
    );

    private ScheduleGenerationService service;
    private ArgumentCaptor<Schedule> captor;

    @Before
    public void setUp(){
        service = new ScheduleGenerationServiceImpl(scheduleDAO, dayTypeDAO);
        captor  = ArgumentCaptor.forClass(Schedule.class);
        when(dayTypeDAO.findByEmployeeId(EMPLOYEE_ID)).thenReturn(dayTypes);
        when(scheduleDAO.getForEmployeeByDate(EMPLOYEE_ID, start, stop)).thenReturn(storedSchedules);
    }

    @Test
    public void testGenerateSchedule(){
        service.generate(EMPLOYEE_ID, start, stop, OFFSET);

        verify(scheduleDAO, times(NUM_OF_DAYS - storedSchedules.size())).create(captor.capture());
        verify(scheduleDAO, times(storedSchedules.size())).update(captor.capture());
        verify(scheduleDAO).getForEmployeeByDate(EMPLOYEE_ID, start, stop);
        verifyNoMoreInteractions(scheduleDAO);

        List<Schedule> result = captor.getAllValues();

        assertFalse(result.isEmpty());
        assertTrue(result.size() == NUM_OF_DAYS);
    }
}
