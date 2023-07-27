package com.example.server.member.auditor;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditingAwareImpl implements AuditorAware<Long> {
    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal().equals("anonymousUser") || !authentication.isAuthenticated())
            return null;

        return Optional.of(Long.valueOf(authentication.getName()));
    }
}
