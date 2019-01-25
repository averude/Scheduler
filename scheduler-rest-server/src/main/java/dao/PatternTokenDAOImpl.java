package dao;

import entity.PatternToken;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class PatternTokenDAOImpl extends AbstractDAO<PatternToken>
        implements PatternTokenDAO {

    @Autowired
    public PatternTokenDAOImpl(SessionFactory sessionFactory) {
        super(PatternToken.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public Collection<PatternToken> findAllInShiftPattern(Long patternId) {
        return getCurrentSession()
                .createQuery("from PatternToken pt " +
                        "where pt.patternId = :patternId", PatternToken.class)
                .setParameter("patternId", patternId)
                .getResultList();
    }
}
