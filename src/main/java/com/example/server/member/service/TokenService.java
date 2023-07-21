package com.example.server.member.service;

import com.example.server.member.dto.MemberIdAndTokenDto;
import com.example.server.member.dto.RefreshTokenDto;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.repository.RefreshTokenJpaRepository;
import com.example.server.member.security.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.sql.Ref;
import java.util.Date;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class TokenService {

    @Value("${jwt.refresh_token_expired}")
    long tokenExpired;
    private final RefreshTokenJpaRepository refreshTokenJpaRepository;
    private final JwtTokenProvider tokenProvider;
    private final MemberJpaRepository memberJpaRepository;

    public String createRefreshToken(String username) {
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        String token = UUID.randomUUID().toString();
        RefreshToken refreshToken = null;

        if(refreshTokenJpaRepository.findByMemberId(member.getId()).isPresent()){
            refreshToken = refreshTokenJpaRepository.findByMemberId(member.getId()).get();
            refreshToken.setActive(true);
            refreshToken.setToken(token);
        }else {
            refreshToken = RefreshToken.builder()
                    .active(true)
                    .token(token)
                    .member(member)
                    .build();
        }

        refreshTokenJpaRepository.save(refreshToken);

        return token;
    }

    public String updateAccessToken(RefreshTokenDto refreshToken) {
        RefreshToken token = refreshTokenJpaRepository.findByToken(refreshToken.getRefreshToken())
                .orElseThrow(() -> new RuntimeException("Refresh Token is not exist"));

        if(!token.getActive()){
            log.info("유효하지 않은 Refresh Token입니다.");
            throw new IllegalArgumentException("유효하지 않은 Refresh Token입니다.");
        }

        Member member = memberJpaRepository.findById(token.getMember().getId()).get();

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

        String value = token.getToken();

        if(value == null || !value.equals(refreshToken.getRefreshToken()))
            return null;

        log.info("토큰 발급 완료");
        return tokenProvider.createToken(authentication);
    }
}
