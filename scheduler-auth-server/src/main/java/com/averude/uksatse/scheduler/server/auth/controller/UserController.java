package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.core.entity.User;
import com.averude.uksatse.scheduler.server.auth.service.SchedulerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;

@RestController
public class UserController {

    private final SchedulerUserDetailsService schedulerUserDetailsService;

    @Autowired
    public UserController(SchedulerUserDetailsService schedulerUserDetailsService) {
        this.schedulerUserDetailsService = schedulerUserDetailsService;
    }

    @RequestMapping(value = "/current", method = RequestMethod.GET)
    public Principal getUser(Principal principal) {
        return principal;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public Iterable<User> getAllByAuth(Authentication authentication) throws Exception {
        return schedulerUserDetailsService.findAllByAuth(authentication);
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<Long> createNewUser(@Valid @RequestBody User user) {
        schedulerUserDetailsService.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(location).body(user.getId());
    }

    @RequestMapping(value = "/users", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user) {
        schedulerUserDetailsService.save(user);
        return ResponseEntity.ok("Entity with ID:" + user.getId() +
                " was successfully updated");
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        schedulerUserDetailsService.deleteById(id);
        return new ResponseEntity<>("Entity with ID:" + id +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
