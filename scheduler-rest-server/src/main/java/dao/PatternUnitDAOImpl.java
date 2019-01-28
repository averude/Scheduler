package dao;

import entity.PatternUnit;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class PatternUnitDAOImpl extends AbstractDAO<PatternUnit>
        implements PatternUnitDAO {

    @Autowired
    public PatternUnitDAOImpl(SessionFactory sessionFactory) {
        super(PatternUnit.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public Collection<PatternUnit> findAllInShiftPattern(Long patternId) {
        return getCurrentSession()
                .createQuery("from PatternToken pt " +
                        "where pt.patternId = :patternId", PatternUnit.class)
                .setParameter("patternId", patternId)
                .getResultList();
    }
}
