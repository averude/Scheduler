package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.model.dto.AccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@RestController
public class UserAccountControllerImpl implements UserAccountController {

    private UserAccountDetailsService userAccountDetailsService;

    @Autowired
    public UserAccountControllerImpl(UserAccountDetailsService userAccountDetailsService) {
        this.userAccountDetailsService = userAccountDetailsService;
    }

    @Override
    public Principal getUser(Principal principal) {
        return principal;
    }

    @Override
    public String getUserFullName(Authentication authentication) {
        return ((UserAccountDetails) authentication.getPrincipal()).getUserAccount().getName();
    }

    @Override
    public List<UserAccount> getAllByAuth(Authentication authentication) throws Exception {
        var userAccount = ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
        log.debug("User:{} - Getting list of user accounts.", userAccount);

        if (userAccount.getAuthority().equals(Authorities.GLOBAL_ADMIN)) {
            return userAccountDetailsService.findAll();
        } else if (userAccount.getAuthority().equals(Authorities.ENTERPRISE_ADMIN)) {
            return userAccountDetailsService.findAllByEnterpriseId(userAccount.getEnterpriseId());
        } else throw new AccessDeniedException("");
    }

    @Override
    public List<AccountDTO> getAllShiftAccountsByAuth(Authentication authentication) {
        var userAccount = ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
        log.debug("User:{} - Getting list of user accounts.", userAccount);

        if (userAccount.getAuthority().equals(Authorities.DEPARTMENT_ADMIN)) {
            var departmentId = userAccount.getDepartmentId();

            return userAccountDetailsService.findAllByDepartmentId(departmentId)
                    .stream()
                    .map(account -> {
                        var shiftIds = account.getAccountShifts()
                                .stream()
                                .map(UserAccountShift::getShiftId)
                                .collect(toList());
                        return new AccountDTO(account, shiftIds);
                    })
                    .collect(toList());
        } else throw new AccessDeniedException("");
    }

    @Override
    public ResponseEntity<Long> createShiftUser(@Valid @RequestBody AccountDTO dto,
                                                Authentication authentication) {
        var userAccount = ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
        log.debug("User:{} - Creating new user account:{}", userAccount, dto);

        userAccountDetailsService.saveShiftAccount(dto, userAccount);
        return ResponseEntity.created(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getUserAccount().getId()).toUri())
                .body(dto.getUserAccount().getId());
    }

    @Override
    public ResponseEntity<String> updateShiftUser(@Valid AccountDTO dto,
                                                  Authentication authentication) {
        var userAccount = ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
        log.debug("User:{} - Updating new user account:{}", userAccount, dto);

        userAccountDetailsService.saveShiftAccount(dto, userAccount);
        return ResponseEntity.ok("User " + userAccount + " updated");
    }

    @Override
    public ResponseEntity<Long> createDepartmentUser(@RequestBody UserAccount user,
                                                     Authentication authentication) {
        var userAccount = ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
        user.setEnterpriseId(userAccount.getEnterpriseId());
        return createNewUser(user, authentication);
    }

    @Override
    public ResponseEntity<Long> createEnterpriseUser(@RequestBody UserAccount user,
                                                     Authentication authentication) {
        return createNewUser(user, authentication);
    }

    private ResponseEntity<Long> createNewUser(UserAccount user, Authentication authentication) {
        log.debug("User:{} - Creating new user account:{}", authentication.getPrincipal(), user);
        userAccountDetailsService.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(user.getUsername()).toUri();

        return ResponseEntity.created(location).body(user.getId());
    }

    @Override
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserAccount user, Authentication authentication) {
        log.debug("User:{} - Updating user account:{}", authentication.getPrincipal(), user);
        userAccountDetailsService.save(user);
        return ResponseEntity.ok("User " + user.getUsername() +
                " was successfully updated");
    }

    @Override
    public ResponseEntity<?> deleteUser(@PathVariable Long accountId, Authentication authentication) {
        return userAccountDetailsService.findById(accountId).map(userAccount -> {
            log.debug("User:{} - Deleting user account:{}", authentication.getPrincipal(), userAccount);
            userAccountDetailsService.delete(userAccount);
            return new ResponseEntity<>("User " + userAccount.getUsername() +
                    " was successfully deleted", HttpStatus.NO_CONTENT);
        }).orElseThrow();
    }
}
