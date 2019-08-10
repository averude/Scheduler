package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.core.entity.Authority;
import com.averude.uksatse.scheduler.shared.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authorities")
public class AuthorityController {

    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityController(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    Iterable<Authority> getAll() {
        return authorityRepository.findAll();
    }
}
