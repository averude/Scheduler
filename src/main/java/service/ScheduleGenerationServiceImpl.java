package service;

import dao.DayTypeDAO;
import dao.ScheduleDAO;
import entity.DayType;
import entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleGenerationServiceImpl implements ScheduleGenerationService {

    private final ScheduleDAO scheduleDAO;
    private final DayTypeDAO dayTypeDAO;

    @Autowired
    public ScheduleGenerationServiceImpl(ScheduleDAO scheduleDAO,
                                         DayTypeDAO dayTypeDAO) {
        this.scheduleDAO = scheduleDAO;
        this.dayTypeDAO = dayTypeDAO;
    }

    @Override
    @Transactional
    public void generate(long employeeId,
                         LocalDate start,
                         LocalDate stop,
                         int offset) {
        List<LocalDate> dates = start.datesUntil(stop.plusDays(1))
                                     .collect(Collectors.toList());
        List<DayType> types = dayTypeDAO.findByEmployeeId(employeeId);
        Collection<Schedule> schedules
                = scheduleDAO.getForEmployeeByDate(employeeId, start, stop);

        int typesSize = types.size();
        int numOfDays = dates.size();

        for (int i = 0; i < numOfDays; i+=typesSize){
            for (int j = 0; j < typesSize; j++){
                int day_index = i + j;
                if (day_index >= numOfDays) break;

                int type_index = (offset + j) % typesSize;

                Optional<Schedule> s = schedules.stream()
                        .filter(schedule -> schedule.getDate()
                                .equals(dates.get(day_index)))
                        .findFirst();

                if (s.isPresent()){
                    Schedule sched = s.get();
                    sched.setHours(types.get(type_index).getValue());
                    scheduleDAO.update(sched);
                } else {
                    Schedule sched = new Schedule();
                    sched.setDate(dates.get(day_index));
                    sched.setEmployeeId(employeeId);
                    sched.setHours(types.get(type_index).getValue());
                    scheduleDAO.create(sched);
                }
            }
        }
    }
}