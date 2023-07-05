package com.example.server.member.security.config;

import com.example.server.member.security.filter.JwtFilter;
import com.example.server.member.security.token.JwtTokenProvider;
import com.example.server.member.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private JwtTokenProvider tokenProvider;
    private TokenService tokenService;

    public JwtSecurityConfig(JwtTokenProvider tokenProvider, TokenService tokenService) {
        this.tokenProvider = tokenProvider;
        this.tokenService = tokenService;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception{
        JwtFilter customFilter = new JwtFilter(tokenProvider, tokenService);
        http
                .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
