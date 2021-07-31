package com.averude.uksatse.scheduler.server.auth.security;

import com.averude.uksatse.scheduler.core.util.CollectionUtils;
import com.averude.uksatse.scheduler.security.controller.base.AccessMapSecurityChecker;
import com.averude.uksatse.scheduler.security.controller.base.DepartmentLevelSecurity;
import com.averude.uksatse.scheduler.security.model.dto.AccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import com.averude.uksatse.scheduler.shared.repository.common.ShiftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.function.Function;

import static com.averude.uksatse.scheduler.security.details.UserLevels.*;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongClaim;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongListClaim;

@Component
@RequiredArgsConstructor
public class UserAccountControllerSecurity {

    private final UserAccountRepository     userAccountRepository;
    private final ShiftRepository           shiftRepository;
    private final DepartmentLevelSecurity   departmentLevelSecurity;
    private final AccessMapSecurityChecker  accessMapSecurityChecker;
    private final TransactionTemplate       transactionTemplate;

    public boolean canSaveShiftAccount(Authentication authentication, String mapName, AccountDTO dto){
        if (!dto.getAuthority().equals(SHIFT)) {
            return false;
        }

        var departmentIds = dto.getDepartmentIds();

        if (departmentLevelSecurity.hasDepPermission(authentication, mapName, departmentIds)) {
            var shifts = shiftRepository.findAllByDepartmentIdInOrderByDepartmentIdAsc(departmentIds);
            return CollectionUtils.containsAll(dto.getShiftIds(), shifts,
                    ((shiftId, shift) -> shift.getId().equals(shiftId)));
        }

        return false;
    }

    public boolean hasAccountPermission(Authentication authentication,
                                        String mapName,
                                        Long accountId) {

        var jwt = (Jwt) authentication.getPrincipal();
        var level = jwt.getClaimAsString("level");
        var enterpriseId = getLongClaim(jwt, "enterpriseId");

        if (accessMapSecurityChecker.checkAccess(jwt, mapName)) {

            Function<UserAccount, Boolean> function = null;

            if (level.equals(DEPARTMENT)) {
                function = account -> {
                    var grantedDepartmentIds = getLongListClaim(jwt, "departmentIds");
                    var accountDepartments = account.getAccountDepartments();

                    return account.getEnterpriseId().equals(enterpriseId) &&
                            CollectionUtils.containsAll(grantedDepartmentIds, accountDepartments,
                                    (perm, acc) -> perm.equals(acc.getDepartmentId()));
                };

            }

            if (level.equals(ENTERPRISE)) {
                function = account -> account.getEnterpriseId().equals(enterpriseId);
            }

            if (function != null) {
                final Function<UserAccount, Boolean> fn = function;
                return transactionTemplate.execute(status ->
                        userAccountRepository.findById(accountId)
                                .map(fn)
                                .orElse(false));
            }
        }

        return false;
    }
}
