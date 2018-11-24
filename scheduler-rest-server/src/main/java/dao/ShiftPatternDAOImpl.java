package dao;

import entity.ShiftPattern;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ShiftPatternDAOImpl
        extends AbstractDAO<ShiftPattern> implements ShiftPatternDAO {

    @Autowired
    public ShiftPatternDAOImpl(SessionFactory sessionFactory){
        super(ShiftPattern.class);
        this.setSessionFactory(sessionFactory);
    }
}
