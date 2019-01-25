package service;

import dao.PatternTokenDAO;
import entity.PatternToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class PatternTokenServiceImpl extends AbstractService<PatternToken>
        implements PatternTokenService {

    private final PatternTokenDAO patternTokenDAO;

    @Autowired
    public PatternTokenServiceImpl(PatternTokenDAO patternTokenDAO) {
        super(patternTokenDAO);
        this.patternTokenDAO = patternTokenDAO;
    }

    @Override
    @Transactional
    public Collection<PatternToken> findAllInParent(long parentId) {
        return patternTokenDAO.findAllInShiftPattern(parentId);
    }

    @Override
    @Transactional
    public void createInParent(long parentId, PatternToken patternToken) {
        if (patternToken.getPatternId() != parentId){
            throw new IllegalArgumentException("ID of ShiftPattern doesn't " +
                    "match with ShiftPattern id in PatternToken entity");
        }
        patternTokenDAO.create(patternToken);
    }

    @Override
    @Transactional
    public void updateById(long id, PatternToken patternToken) {
        if (patternToken.getId() == null || !patternToken.getId().equals(id)) {
            patternToken.setId(id);
        }
        patternTokenDAO.update(patternToken);
    }
}
