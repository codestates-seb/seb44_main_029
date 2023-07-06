package com.example.server.member.service;

import com.example.server.member.Mapper.MemberMapper;
import com.example.server.member.dto.*;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.security.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider tokenProvider;
    private final TokenService tokenService;
    private final MemberJpaRepository memberJpaRepository;
    private final MemberMapper memberMapper;
    private final RedisTemplate<String, Object> redisTemplate;

    public TokenResponse login(MemberLoginDto dto){
        UsernamePasswordAuthenticationToken AuthenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(AuthenticationToken);

        String username = authentication.getName();

        RefreshToken token = tokenService.createRefreshToken(username);
        String refreshToken = token.getToken();
        String accessToken = tokenProvider.createToken(authentication);

        redisTemplate.opsForValue().set("RT:" + dto.getEmail(), refreshToken, token.getExpired().getTime(), TimeUnit.MILLISECONDS);

        TokenResponse response = TokenResponse.builder()
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .build();

        return response;
    }

    public void logout(TokenResponse dto){
        if(!tokenProvider.validateToken(dto.getAccessToken()))
            throw new IllegalArgumentException("로그아웃: 유효하지 않은 토큰입니다.");

        Authentication authentication = tokenProvider.getAuthentication(dto.getAccessToken());

        if(redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null)
            redisTemplate.delete("RT:" + authentication.getName());

        Long expiration = tokenProvider.getExpriation(dto.getAccessToken()).getTime();
        redisTemplate.opsForValue().set(dto.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
    }

    public Long signUp(MemberSignUpDto dto){
        long memberId = -1;

        if(memberJpaRepository.findByMemberEmail(dto.getEmail()).isPresent()){
            log.info("Email 중복");
            return memberId;
        }else if(memberJpaRepository.findByMemberUsername(dto.getUsername()).isPresent()){
            log.info("Username 중복");
            return memberId;
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(dto.getPassword());

        Member member = Member.builder()
                .email(dto.getEmail())
                .username(dto.getUsername())
                .password(password)
                .imageUrl(null)
                .role(Member.Role.USER)
                .build();

        memberId = memberJpaRepository.save(member).getId();

        log.info("회원가입 성공");
        return memberId;
    }

    public MemberResponseDto read(Long memberId){
        Member member =  memberJpaRepository.findById(memberId)
                .orElseThrow( () -> new UsernameNotFoundException("존재하지 않은 유저입니다."));

        return memberMapper.memberToMemberResponseDto(member);
    }

    public Long update(MemberUpdateDto dto, Long memberId){
        if(memberJpaRepository.findByMemberUsername(dto.getUsername()).isPresent()){
            log.info("Email 중복");
            return Long.valueOf(-1);
        }

        Member member = memberJpaRepository.findById(memberId)
                .orElseThrow( () -> new UsernameNotFoundException("존재하지 않은 유저입니다."));

        member.setUsername(dto.getUsername());
        member.setImageUrl(dto.getImageUrl());

        memberJpaRepository.save(member);

        return memberId;
    }

    public void delete(Long memberId){
        memberJpaRepository.deleteById(memberId);
    }

    public Long getMemberId(Authentication authentication){
        String username = authentication.getName();

        return memberJpaRepository.findByMemberUsername(username).get().getId();
    }
}
