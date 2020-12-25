package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.EnterpriseAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

public interface UserAccountController {
    @RequestMapping(value = "/current", method = RequestMethod.GET)
    Principal getUser(Principal principal);

    @RequestMapping(value = "/current/full_name", method = RequestMethod.GET)
    String getUserFullName(Authentication authentication);

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    List<UserAccount> getAllByAuth(Authentication authentication) throws Exception;

    @IsDepartmentAdmin
    @RequestMapping(value = "/users/shift_admins", method = RequestMethod.POST)
    ResponseEntity<String> createNewShiftUser(@Valid @RequestBody ShiftAdminUserAccount user, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(value = "/users/department_admins", method = RequestMethod.POST)
    ResponseEntity<String> createNewDepartmentUser(@Valid @RequestBody DepartmentAdminUserAccount user, Authentication authentication);

    @IsGlobalAdmin
    @RequestMapping(value = "/users/enterprise_admins", method = RequestMethod.POST)
    ResponseEntity<String> createNewEnterpriseUser(@Valid @RequestBody EnterpriseAdminUserAccount user, Authentication authentication);

    @RequestMapping(value = "/users", method = RequestMethod.PUT)
    ResponseEntity<?> updateUser(@Valid @RequestBody UserAccount user, Authentication authentication);

    @RequestMapping(value = "/users/{accountId}", method = RequestMethod.DELETE)
    ResponseEntity<?> deleteUser(@PathVariable Long accountId, Authentication authentication);
}
