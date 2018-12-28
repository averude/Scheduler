package dao;

import entity.PatternToken;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PatternTokenDAOImpl extends AbstractDAO<PatternToken>
        implements PatternTokenDAO {

    @Autowired
    public PatternTokenDAOImpl(SessionFactory sessionFactory) {
        super(PatternToken.class);
        this.setSessionFactory(sessionFactory);
    }
}
