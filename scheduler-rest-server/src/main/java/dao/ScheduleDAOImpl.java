package dao;

import entity.WorkDay;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;

@Repository
public class ScheduleDAOImpl extends AbstractDAO<WorkDay> implements ScheduleDAO {

    @Autowired
    public ScheduleDAOImpl(SessionFactory sessionFactory) {
        super(WorkDay.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public Collection<WorkDay> getMonth(long employeeId,
                                        LocalDate date) {
        return getCurrentSession()
                .createQuery("select wd from WorkDay wd " +
                        "where wd.employeeId = :employeeId " +
                        "and month(wd.date) = :month " +
                        "and year(wd.date) = :year", WorkDay.class)
                .setParameter("employeeId", employeeId)
                .setParameter("month", date.getMonthValue())
                .setParameter("year", date.getYear())
                .getResultList();
    }

    @Override
    public Collection<WorkDay> getForEmployeeByDate(long employeeId,
                                                    LocalDate from,
                                                    LocalDate to) {
        return getCurrentSession()
                .createQuery("select wd from WorkDay wd " +
                        "where wd.employeeId = :employeeId " +
                        "and wd.date >= :from " +
                        "and wd.date <= :to ", WorkDay.class)
                .setParameter("employeeId", employeeId)
                .setParameter("from", from)
                .setParameter("to", to)
                .getResultList();
    }
}