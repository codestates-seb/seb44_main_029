package com.example.server.member.service;

import com.example.server.member.dto.MemberIdAndTokenDto;
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

    public RefreshToken createRefreshToken(String username) {
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        if(refreshTokenJpaRepository.findByMemberId(member.getId()).isPresent())
            return refreshTokenJpaRepository.findByMemberId(member.getId()).get();

        RefreshToken token = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expired(new Date(new Date().getTime() + tokenExpired))
                .member(member)
                .build();

//        return refreshTokenJpaRepository.save(token);
        return token;
    }

    public boolean checkRefreshToken(String username) {
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        String token = (String) redisTemplate.opsForValue().get("RT:" + member.getEmail());

//        RefreshToken token = refreshTokenJpaRepository.findByMemberId(member.getId())
//                .orElseThrow( () ->new RuntimeException("Refresh Token not Exist"));
        if(token == null) throw new RuntimeException("Refresh Token not existed");

        if(token == null){
            log.info("RefreshToken is not existed");
            return false;
        }

//        Date time = token.getExpired();
//
//        if (time.before(new Date()))
//            return false;

        return true;
    }

    public MemberIdAndTokenDto updateAccessToken(String username) {
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

        String accessToken = tokenProvider.createToken(authentication);
        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + member.getEmail());

        MemberIdAndTokenDto memberIdAndTokenDto = MemberIdAndTokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        return memberIdAndTokenDto;
    }
}
