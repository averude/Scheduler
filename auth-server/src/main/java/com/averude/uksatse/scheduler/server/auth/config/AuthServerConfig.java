package com.averude.uksatse.scheduler.server.auth.config;

import com.averude.uksatse.scheduler.server.auth.converter.JwtCustomHeadersAccessTokenConverter;
import com.averude.uksatse.scheduler.server.auth.converter.SchedulerUserAuthenticationConverter;
import com.averude.uksatse.scheduler.server.auth.filter.LoginRequestLogFilter;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.KeyUse;
import com.nimbusds.jose.jwk.RSAKey;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.UserAuthenticationConverter;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;

import java.security.KeyPair;
import java.security.interfaces.RSAPublicKey;
import java.util.Collections;
import java.util.Map;

@Import(AuthorizationServerEndpointsConfiguration.class)
@EnableConfigurationProperties(JwkConfigProperties.class)
@Configuration
@RequiredArgsConstructor
public class AuthServerConfig extends AuthorizationServerConfigurerAdapter {

    private final JwkConfigProperties       jwkConfProperties;
    private final AuthenticationManager     authenticationManager;
    private final UserAccountDetailsService userAccountDetailsService;
    private final BCryptPasswordEncoder     encoder;

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        super.configure(security);
        security.addTokenEndpointAuthenticationFilter(new LoginRequestLogFilter());
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
                .tokenStore(tokenStore())
                .accessTokenConverter(accessTokenConverter())
                .authenticationManager(authenticationManager);
    }

    @Override
    @SneakyThrows
    public void configure(ClientDetailsServiceConfigurer clients) {
        clients.inMemory()
                .withClient("browser")
                .secret(encoder.encode("secret"))
                .authorizedGrantTypes("password")
                .scopes("ui")
                .accessTokenValiditySeconds(jwkConfProperties.getValiditySeconds());
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public UserAuthenticationConverter userAuthenticationConverter() {
        var authenticationConverter = new SchedulerUserAuthenticationConverter();
        authenticationConverter.setUserDetailsService(userAccountDetailsService);
        return authenticationConverter;
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        Map<String, String> customHeaders = Collections.singletonMap("kid", jwkConfProperties.getJwkKid());
        JwtCustomHeadersAccessTokenConverter jwtAccessTokenConverter = new JwtCustomHeadersAccessTokenConverter(customHeaders, keyPair());
        ((DefaultAccessTokenConverter) jwtAccessTokenConverter.getAccessTokenConverter())
                .setUserTokenConverter(userAuthenticationConverter());
        return jwtAccessTokenConverter;
    }

    @Bean
    @Primary
    public DefaultTokenServices tokenServices() {
        DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
        defaultTokenServices.setTokenStore(tokenStore());
        defaultTokenServices.setSupportRefreshToken(false);
        return defaultTokenServices;
    }

    @Bean
    public KeyPair keyPair() {
        ClassPathResource ksFile = new ClassPathResource(jwkConfProperties.getKeyStoreFile());
        KeyStoreKeyFactory ksFactory = new KeyStoreKeyFactory(ksFile, jwkConfProperties.getKeyStorePassword().toCharArray());
        return ksFactory.getKeyPair(jwkConfProperties.getKeyAlias());
    }

    @Bean
    public JWKSet jwkSet() {
        RSAKey.Builder builder = new RSAKey.Builder((RSAPublicKey) keyPair().getPublic()).keyUse(KeyUse.SIGNATURE)
                .algorithm(JWSAlgorithm.RS256)
                .keyID(jwkConfProperties.getJwkKid());
        return new JWKSet(builder.build());
    }
}
