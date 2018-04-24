package dao;

import entity.Schedule;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ScheduleDAOImpl extends AbstractDAO<Schedule> implements ScheduleDAO {

    @Autowired
    public ScheduleDAOImpl(SessionFactory sessionFactory) {
        super(Schedule.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public List<Schedule> listMonth(long employeeId, int month, int year) {
        return this.getCurrentSession()
                .createQuery("from Schedule " +
                        "where employee.id = :employeeId " +
                        "and month=:month and year=:year", Schedule.class)
                .setParameter("employeeId", employeeId)
                .setParameter("month", month)
                .setParameter("year", year)
                .getResultList();
    }

    @Override
    public Schedule getDay(long employeeId, int day, int month, int year) {
        return this.getCurrentSession()
                .createQuery("select Schedule from Schedule " +
                        "where employee.id = :employeeId " +
                        "and day=:day and month=:month and year=:year", Schedule.class)
                .setParameter("employeeId", employeeId)
                .setParameter("day", day)
                .setParameter("month", month)
                .setParameter("year", year)
                .getSingleResult();
    }
}
