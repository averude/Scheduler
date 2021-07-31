package com.averude.uksatse.scheduler.server.auth.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Getter
@ConstructorBinding
@ConfigurationProperties("security.jwt")
public class JwkConfigProperties {

    @NotNull
    private final int validitySeconds;

    @NotNull
    private final String keyStoreFile;

    @NotNull
    private final String keyStorePassword;

    @NotNull
    private final String keyAlias;

    @NotNull
    private final String jwkKid;
}
