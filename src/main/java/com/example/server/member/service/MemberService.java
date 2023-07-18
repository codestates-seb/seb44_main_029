package com.example.server.member.service;

import com.example.server.member.Mapper.MemberMapper;
import com.example.server.member.dto.*;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.MemberRecord;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.repository.MemberRecordJpaRepository;
import com.example.server.member.security.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.concurrent.TimeUnit;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService{
    @Value("${jwt.refresh_token_expired}")
    long refreshTokenExpired;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider tokenProvider;
    private final TokenService tokenService;
    private final MemberJpaRepository memberJpaRepository;
    private final MemberRecordJpaRepository memberRecordJpaRepository;
    private final MemberMapper memberMapper;
    private final RedisTemplate<String, Object> redisTemplate;

    public boolean isRequesterSameOwner(Long requestId, Long ownerId){
        return (ownerId == requestId);
    }

    public MemberIdAndTokenDto login(MemberLoginDto dto){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String username = authentication.getName();
        Member member = memberJpaRepository.findByMemberUsername(username).get();

        String refreshToken = tokenService.createRefreshToken(username);
        String accessToken = tokenProvider.createToken(authentication);

        redisTemplate.opsForValue().set("RT:" + member.getId(), refreshToken, refreshTokenExpired, TimeUnit.MILLISECONDS);

        MemberIdAndTokenDto response = MemberIdAndTokenDto.builder()
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .memberId(((Member) authentication.getPrincipal()).getId())
                .build();

        return response;
    }

    public void logout(MemberIdAndTokenDto dto){
        if(!tokenProvider.validateToken(dto.getAccessToken()))
            throw new IllegalArgumentException("로그아웃: 유효하지 않은 토큰입니다.");

        Authentication authentication = tokenProvider.getAuthentication(dto.getAccessToken());

        if(redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            redisTemplate.delete("RT:" + authentication.getName());

            Long expiration = tokenProvider.getExpriation(dto.getAccessToken()).getTime();
            redisTemplate.opsForValue().set(dto.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
        }else{
            throw new RuntimeException("Refresh Token is not exist");
        }
    }

    public Long signUp(MemberSignUpDto dto){
        long memberId = -1;

        if(memberJpaRepository.findByMemberEmail(dto.getEmail()).isPresent()){
            log.info("Email 중복");
            return memberId;
        }else if(memberJpaRepository.findByMemberUsername(dto.getUsername()).isPresent()){
            log.info("Username 중복");
            return memberId - 1;
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

        MemberRecord record = recordMember(member);

        if(dto.getUsername() != null)
            member.setUsername(dto.getUsername());
        if(dto.getImageUrl() != null)
            member.setImageUrl(dto.getImageUrl());

        memberRecordJpaRepository.save(record);
        memberJpaRepository.save(member);

        return memberId;
    }

    public Long updatePassword(Long memberId, MemberPasswordUpdateDto dto){
        Member member = memberJpaRepository.findById(memberId).
                orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String password = member.getPassword();
        String oldPassword = passwordEncoder.encode(dto.getOldPassword());

        if(!password.equals(oldPassword)){
            return Long.valueOf(-1);
        }

        MemberRecord record = recordMember(member);
        member.setPassword(passwordEncoder.encode(dto.getNewPassword()));

        memberRecordJpaRepository.save(record);

        return memberJpaRepository.save(member).getId();
    }

    public void delete(Long memberId) {
        Member member = memberJpaRepository.findById(memberId).get();

        memberJpaRepository.save(member);
    }

    public MemberRecord recordMember(Member member){
        return MemberRecord.builder()
                .username(member.getUsername())
                .email(member.getEmail())
                .password(member.getPassword())
                .imageUrl(member.getImageUrl())
                .role(member.getRole())
                .createAt(member.getModifiedAt())
                .member(member)
                .build();
    }

    public Long getMemberId(Authentication authentication){
        String username = authentication.getName();

        return memberJpaRepository.findByMemberUsername(username).get().getId();
    }
}
