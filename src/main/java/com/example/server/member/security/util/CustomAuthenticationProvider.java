package com.example.server.member.security.util;

import com.example.server.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final CustomUserDetailService userDetailService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;

        String email = token.getName();
        String password = (String) token.getCredentials();

        Member member = (Member) userDetailService.loadUserByUsername(email);
        if(!passwordEncoder.matches(password, member.getPassword()))
            throw new BadCredentialsException(member.getUsername() + "Wrong Password");

        return new UsernamePasswordAuthenticationToken(member, password, member.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
