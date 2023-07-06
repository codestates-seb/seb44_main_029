package com.example.server.member.service;

import com.example.server.member.dto.TokenResponse;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.repository.RefreshTokenJpaRepository;
import com.example.server.member.security.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TokenService {

    @Value("${jwt.refresh_token_expired}")
    long tokenExpired;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RefreshTokenJpaRepository refreshTokenJpaRepository;
    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;
    private final MemberJpaRepository memberJpaRepository;

    public RefreshToken createRefreshToken(String username) {
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        if(refreshTokenJpaRepository.findByMemberId(member.getId()).isPresent())
            return refreshTokenJpaRepository.findByMemberId(member.getId()).get();

        RefreshToken token = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expired(new Date(new Date().getTime() + tokenExpired))
                .member(member)
                .build();

        return refreshTokenJpaRepository.save(token);
    }

    public boolean checkRefreshToken(String username) {
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        RefreshToken token = refreshTokenJpaRepository.findByMemberId(member.getId())
                .orElseThrow( () ->new RuntimeException("Refresh Token not Exist"));

        Date time = token.getExpired();

        if (time.before(new Date()))
            return false;

        return true;
    }

    public RefreshToken updateRefreshToken(String username){
        refreshTokenJpaRepository.deleteByToken(username);

        return createRefreshToken(username);
    }

    public boolean deleteRefreshToken(String username) {
        refreshTokenJpaRepository.deleteByToken(username);

        return true;
    }

    public TokenResponse updateAccessToken(String username) {
        TokenResponse tokenResponse = TokenResponse.builder()
                .token("-1")
                .accessToken("-1")
                .build();

        Member member = memberJpaRepository.findByMemberUsername(username).get();

        if (!checkRefreshToken(username)){
            deleteRefreshToken(username);

            return tokenResponse;
        }

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

        String accessToken = tokenProvider.createToken(authentication);
        String token = refreshTokenJpaRepository.findByMemberId(member.getId()).get().getToken();

        tokenResponse = TokenResponse.builder()
                .accessToken(accessToken)
                .token(token)
                .build();

        return tokenResponse;
    }
}
