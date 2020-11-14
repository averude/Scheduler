package com.averude.uksatse.scheduler.security.modifier.dto;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.security.entity.EnterpriseAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class EnterpriseIdDtoModifier<P extends HasEnterpriseId, C extends Serializable> implements DtoModifier<P, C> {
    @Override
    public void modify(BasicDto<P, C> dto, Authentication authentication) {
        var userAccount = (EnterpriseAdminUserAccount) authentication.getPrincipal();
        var enterpriseId = userAccount.getEnterpriseId();

        if (enterpriseId == null) throw new NullOrgLevelIdException();
        dto.getParent().setEnterpriseId(enterpriseId);
    }
}
