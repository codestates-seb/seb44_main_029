package com.example.server.member.security.config;

import com.example.server.member.repository.BlackListJpaRepository;
import com.example.server.member.repository.RefreshTokenJpaRepository;
import com.example.server.member.security.filter.JwtFilter;
import com.example.server.member.security.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private JwtTokenProvider tokenProvider;
    private BlackListJpaRepository blackListJpaRepository;

    public JwtSecurityConfig(JwtTokenProvider tokenProvider, BlackListJpaRepository blackListJpaRepository) {
        this.tokenProvider = tokenProvider;
        this.blackListJpaRepository = blackListJpaRepository;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception{
        JwtFilter customFilter = new JwtFilter(tokenProvider, blackListJpaRepository);
        http
                .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
