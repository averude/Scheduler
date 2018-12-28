package service;

import dao.PatternTokenDAO;
import dao.ShiftPatternDAO;
import entity.PatternToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class PatternTokenServiceImpl extends AbstractService<PatternToken>
        implements PatternTokenService {

    private final PatternTokenDAO patternTokenDAO;
    private final ShiftPatternDAO shiftPatternDAO;

    @Autowired
    public PatternTokenServiceImpl(PatternTokenDAO patternTokenDAO,
                                   ShiftPatternDAO shiftPatternDAO) {
        super(patternTokenDAO);
        this.patternTokenDAO = patternTokenDAO;
        this.shiftPatternDAO = shiftPatternDAO;
    }

    @Override
    public Collection<PatternToken> findAllInParent(long parentId) {
        return shiftPatternDAO.findById(parentId).getSequence();
    }

    @Override
    public void createInParent(long parentId, PatternToken patternToken) {
        shiftPatternDAO.findById(parentId).addPatternToken(patternToken);
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
