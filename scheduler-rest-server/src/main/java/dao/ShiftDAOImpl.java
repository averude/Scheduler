package dao;

import entity.Shift;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ShiftDAOImpl extends AbstractDAO<Shift> implements ShiftDAO {

    @Autowired
    public ShiftDAOImpl(SessionFactory sessionFactory) {
        super(Shift.class);
        this.setSessionFactory(sessionFactory);
    }
}
