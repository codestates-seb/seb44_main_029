package com.example.server.member.config;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AwareConfig implements AuditorAware<Long> {
    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal().equals("anonymousUser") || !authentication.isAuthenticated())
            return null;

        return Optional.of(Long.valueOf(authentication.getName()));
    }
}
