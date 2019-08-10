package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.HasId;
import com.averude.uksatse.scheduler.core.exception.DecodedDetailsMissingFieldException;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;

import static com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor.*;

public abstract class AbstractByAuthService<T extends HasId, ID>
        extends AbstractService<T, ID> implements GenericByAuthService<T, ID> {

    private final TokenExtraDetailsExtractor detailsExtractor;

    public AbstractByAuthService(CrudRepository<T, ID> repository,
                                 TokenExtraDetailsExtractor detailsExtractor) {
        super(repository);
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    public Iterable<T> findAllByAuth(Authentication authentication) {
        Map<String, Integer> decodedDetails = detailsExtractor.extractDecodedDetails(authentication);
        List<String> authoritiesList = detailsExtractor.getAuthoritiesList(authentication);

        if (authoritiesList.contains(DEPARTMENT_ADMIN)) {
            return findAllByDepartmentId(decodedDetails.get(DEPARTMENT_ID).longValue());
        } else if (authoritiesList.contains(SHIFT_ADMIN)) {
            return findAllByShiftId(decodedDetails.get(SHIFT_ID).longValue());
        } else {
            throw new DecodedDetailsMissingFieldException("No required authorities found");
        }
    }

    protected Iterable<T> findAllByDepartmentId(long departmentId) {
        throw new DecodedDetailsMissingFieldException("No required authorities found");
    }

    protected Iterable<T> findAllByShiftId(long shiftId) {
        throw new DecodedDetailsMissingFieldException("No required authorities found");
    }

}
