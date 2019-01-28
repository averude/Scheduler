package service;

import dao.PatternUnitDAO;
import entity.PatternUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class PatternUnitServiceImpl extends AbstractService<PatternUnit>
        implements PatternUnitService {

    private final PatternUnitDAO patternUnitDAO;

    @Autowired
    public PatternUnitServiceImpl(PatternUnitDAO patternUnitDAO) {
        super(patternUnitDAO);
        this.patternUnitDAO = patternUnitDAO;
    }

    @Override
    @Transactional
    public Collection<PatternUnit> findAllInParent(long parentId) {
        return patternUnitDAO.findAllInShiftPattern(parentId);
    }

    @Override
    @Transactional
    public void createInParent(long parentId, PatternUnit patternUnit) {
        if (patternUnit.getPatternId() != parentId){
            throw new IllegalArgumentException("ID of ShiftPattern doesn't " +
                    "match with ShiftPattern id in PatternUnit entity");
        }
        patternUnitDAO.create(patternUnit);
    }

    @Override
    @Transactional
    public void updateById(long id, PatternUnit patternUnit) {
        if (patternUnit.getId() == null || !patternUnit.getId().equals(id)) {
            patternUnit.setId(id);
        }
        patternUnitDAO.update(patternUnit);
    }
}
