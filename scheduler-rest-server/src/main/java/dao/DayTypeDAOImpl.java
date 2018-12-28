package dao;

import entity.DayType;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DayTypeDAOImpl
        extends AbstractDAO<DayType> implements DayTypeDAO {

    @Autowired
    DayTypeDAOImpl(SessionFactory sessionFactory) {
        super(DayType.class);
        this.setSessionFactory(sessionFactory);
    }
}