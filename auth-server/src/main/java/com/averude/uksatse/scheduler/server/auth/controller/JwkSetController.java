package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.logging.Logged;
import com.nimbusds.jose.jwk.JWKSet;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class JwkSetController {

    private final JWKSet jwkSet;

    @Logged
    @GetMapping("/.well-known/jwks.json")
    public Map<String, Object> keys() {
        return this.jwkSet.toJSONObject();
    }

}
