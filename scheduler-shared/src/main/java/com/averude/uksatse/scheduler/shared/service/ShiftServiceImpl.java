package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Shift;
import com.averude.uksatse.scheduler.core.exception.DecodedDetailsMissingFieldException;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor.*;

@Service
public class ShiftServiceImpl
        extends AbstractService<Shift, Long> implements ShiftService {

    private final ShiftRepository shiftRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public ShiftServiceImpl(ShiftRepository shiftRepository,
                            TokenExtraDetailsExtractor detailsExtractor) {
        super(shiftRepository);
        this.shiftRepository = shiftRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public List<Shift> findAllByDepartmentId(long departmentId) {
        return shiftRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Shift> findAllByAuth(Authentication authentication) {
        Map<String, Integer> decodedDetails = detailsExtractor.extractDecodedDetails(authentication);
        List<String> authoritiesList = detailsExtractor.getAuthoritiesList(authentication);

        if (authoritiesList.contains(GLOBAL_ADMIN)) {
            return findAll();
        } else if (authoritiesList.contains(DEPARTMENT_ADMIN)) {
            return findAllByDepartmentId(decodedDetails.get(DEPARTMENT_ID).longValue());
        } else {
            throw new DecodedDetailsMissingFieldException("No required authorities found");
        }
    }
}
