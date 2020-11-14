package com.averude.uksatse.scheduler.security.modifier.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.security.entity.EnterpriseAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class EnterpriseIdEntityModifier<T extends HasEnterpriseId> implements EntityModifier<T> {
    @Override
    public void modify(T hasEnterpriseId, Authentication authentication) {
        var userAccount = (EnterpriseAdminUserAccount) convertToUserAccount(authentication);
        Long enterpriseId = userAccount.getEnterpriseId();

        if (enterpriseId == null) throw new NullOrgLevelIdException();
        hasEnterpriseId.setEnterpriseId(enterpriseId);
    }

    @Override
    public void modifyAll(Iterable<T> iterable, Authentication authentication) {
        var userAccount = (EnterpriseAdminUserAccount) convertToUserAccount(authentication);
        Long enterpriseId = userAccount.getEnterpriseId();

        if (enterpriseId == null) throw new NullOrgLevelIdException();
        iterable.forEach(hasEnterpriseId -> hasEnterpriseId.setEnterpriseId(enterpriseId));
    }
}
