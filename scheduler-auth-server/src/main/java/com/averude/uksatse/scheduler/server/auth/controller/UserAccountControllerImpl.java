package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.entity.*;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
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
    public List<UserAccount> getAllByAuth(Authentication authentication) throws Exception {
        var userAccount = ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();

        if (userAccount instanceof GlobalAdminUserAccount) {
            return userAccountDetailsService.findAll();
        } else if (userAccount instanceof EnterpriseAdminUserAccount) {
            return userAccountDetailsService.findAllByEnterpriseId(((EnterpriseAdminUserAccount) userAccount).getEnterpriseId());
        } else if (userAccount instanceof DepartmentAdminUserAccount) {
            return userAccountDetailsService.findAllByDepartmentId(((DepartmentAdminUserAccount) userAccount).getDepartmentId());
        } else throw new AccessDeniedException("");
    }


    @Override
    public ResponseEntity<String> createNewShiftUser(@Valid @RequestBody ShiftAdminUserAccount user) {
        return createNewUser(user);
    }

    @Override
    public ResponseEntity<String> createNewDepartmentUser(@Valid @RequestBody DepartmentAdminUserAccount user) {
        return createNewUser(user);
    }

    @Override
    public ResponseEntity<String> createNewEnterpriseUser(@Valid @RequestBody EnterpriseAdminUserAccount user) {
        return createNewUser(user);
    }

    private ResponseEntity<String> createNewUser(UserAccount user) {
        userAccountDetailsService.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{username}")
                .buildAndExpand(user.getUsername()).toUri();

        return ResponseEntity.created(location).body(user.getUsername());
    }

    @Override
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserAccount user) {
        userAccountDetailsService.save(user);
        return ResponseEntity.ok("User " + user.getUsername() +
                " was successfully updated");
    }

    @Override
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        userAccountDetailsService.deleteById(username);
        return new ResponseEntity<>("User " + username +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
