package com.averude.uksatse.scheduler.server.auth.converter;

import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Component
@RequiredArgsConstructor
public class UserAccountDTOConverter {

    private final PasswordEncoder encoder;

    public List<UserAccountShift> getAccountShifts(List<Long> shiftIds,
                                                   Long userAccountId) {
        if (shiftIds == null) {
            return Collections.emptyList();
        }

        return shiftIds.stream()
                .map(shiftId -> new UserAccountShift(userAccountId, shiftId))
                .collect(toList());
    }

    public UserAccount convertToUserAccount(NewUserAccountDTO accountDTO,
                                            Long enterpriseId,
                                            Long departmentId) {
        var userAccount = new UserAccount(accountDTO);

        userAccount.setPassword(encoder.encode(accountDTO.getPassword()));
        userAccount.setEnterpriseId(enterpriseId);

        if (departmentId != null) {
            userAccount.setDepartmentId(departmentId);
        } else {
            userAccount.setDepartmentId(accountDTO.getDepartmentId());
        }

        return userAccount;
    }

    public UserAccountDTO convertToDTO(UserAccount userAccount) {
        return new UserAccountDTO(userAccount);
    }

    public UserAccountDTO convertToDTO(UserAccount userAccount, List<Long> shiftIds) {
        return new UserAccountDTO(userAccount, shiftIds);
    }

    public List<UserAccountDTO> convertToDTO(List<UserAccount> userAccounts) {
        return userAccounts
                .stream()
                .map(UserAccountDTO::new)
                .collect(Collectors.toList());
    }
}
