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
    private final RedisTemplate<String, Object> redisTemplate;
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
//        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + member.getId());
//        if(refreshToken != null)
//            return refreshToken;
//
//        refreshToken = UUID.randomUUID().toString();

        refreshTokenJpaRepository.save(refreshToken);

        return token;
    }

    public String updateAccessToken(Long memberId, RefreshTokenDto refreshToken) {
        Member member = memberJpaRepository.findById(memberId).get();

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

//        String value = (String) redisTemplate.opsForValue().get("RT:" + memberId);
        RefreshToken token = refreshTokenJpaRepository.findByToken(refreshToken.getRefreshToken())
                .orElseThrow(() -> new RuntimeException("Refresh Token is not exist"));

        String value = token.getToken();

        if(value == null || !value.equals(refreshToken.getRefreshToken()))
            return null;

        return tokenProvider.createToken(authentication);
    }
}
