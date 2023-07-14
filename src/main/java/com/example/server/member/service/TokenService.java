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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

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
    private final RedisTemplate<String, Object> redisTemplate;
    private final MemberJpaRepository memberJpaRepository;

    public String createRefreshToken(String username) {
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + member.getId());
        if(refreshToken != null)
            return refreshToken;

        refreshToken = UUID.randomUUID().toString();
        return refreshToken;
    }

    public String updateAccessToken(Long memberId, RefreshTokenDto refreshToken) {
        Member member = memberJpaRepository.findById(memberId).get();

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

        String value = (String) redisTemplate.opsForValue().get("RT:" + memberId);
        if(value == null || !value.equals(refreshToken.getRefreshToken()))
            return null;

        return tokenProvider.createToken(authentication);
    }
}
