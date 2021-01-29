package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.validation.Valid;
import java.util.List;

public interface UserAccountDetailsService extends UserDetailsService {

    List<UserAccountDTO> findAllEnterpriseUserAccounts();

    List<UserAccountDTO> findAllByEnterpriseId(Long enterpriseId);

    List<UserAccountDTO> findAllByDepartmentId(Long departmentId);

    UserAccountDTO createEnterpriseUser(@Valid NewUserAccountDTO accountDTO, UserAccount originator);

    UserAccountDTO createDepartmentUser(@Valid NewUserAccountDTO accountDTO, UserAccount originator);

    UserAccountDTO createShiftUser(@Valid NewUserAccountDTO accountDTO, UserAccount originator);

    UserAccountDTO updateUser(UserAccountDTO accountDTO);

    void changePassword(@Valid PasswordChangeDTO passwordChangeDTO, UserAccount originator);

    void deleteEnterpriseUser(Long accountId, UserAccount originator);

    UserAccountDTO updateDepartmentUser(UserAccountDTO userAccountDTO, UserAccount originator);

    void deleteDepartmentUser(Long accountId, UserAccount originator);

    UserAccountDTO updateShiftUser(UserAccountDTO userAccountDTO, UserAccount originator);

    void deleteShiftUser(Long accountId, UserAccount originator);
}
