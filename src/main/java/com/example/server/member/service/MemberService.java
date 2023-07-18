package com.example.server.member.service;

import com.example.server.member.Mapper.MemberMapper;
import com.example.server.member.dto.*;
import com.example.server.member.entity.BlackList;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.MemberRecord;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.repository.BlackListJpaRepository;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.repository.MemberRecordJpaRepository;
import com.example.server.member.repository.RefreshTokenJpaRepository;
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
import java.util.UUID;
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
    private final RefreshTokenJpaRepository refreshTokenJpaRepository;
    private final BlackListJpaRepository blackListJpaRepository;
//    private final RedisTemplate<String, Object> redisTemplate;

    public boolean isRequesterSameOwner(Long requestId, Long ownerId){
        return requestId == ownerId;
    }

    public MemberIdAndTokenDto login(MemberLoginDto dto){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String username = authentication.getName();
//        Member member = memberJpaRepository.findByMemberUsername(username).get();

        String refreshToken = tokenService.createRefreshToken(username);
        String accessToken = tokenProvider.createToken(authentication);



//        redisTemplate.opsForValue().set("RT:" + member.getId(), refreshToken, refreshTokenExpired, TimeUnit.MILLISECONDS);

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

//        Authentication authentication = tokenProvider.getAuthentication(dto.getAccessToken());

        RefreshToken refreshToken = refreshTokenJpaRepository.findByToken(dto.getRefreshToken()).get();

        if(refreshToken != null){
            refreshToken.setActive(false);

            BlackList blackList = BlackList.builder()
                    .accessToken(dto.getAccessToken())
                    .build();

            blackListJpaRepository.save(blackList);
        }else{
            throw new RuntimeException("Refresh Token is not exist");
        }

//        if(redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
//            redisTemplate.delete("RT:" + authentication.getName());
//
//            Long expiration = tokenProvider.getExpriation(dto.getAccessToken()).getTime();
//            redisTemplate.opsForValue().set(dto.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
//        }else{
//            throw new RuntimeException("Refresh Token is not exist");
//        }
    }

    public Long signUp(MemberSignUpDto dto){
        boolean isEmailPresent = memberJpaRepository.findByMemberEmail(dto.getEmail()).isPresent();
        boolean isUsernamePresent = memberJpaRepository.findByMemberUsername(dto.getUsername()).isPresent();

        if(isEmailPresent && isUsernamePresent){
            log.info("Email, Username 중복");
            return -3L;
        }
        else if(isEmailPresent){
            log.info("Email 중복");
            return -2L;
        }else if(isUsernamePresent){
            log.info("Username 중복");
            return -1L;
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(dto.getPassword());

        Member member = Member.builder()
                .active(true)
                .email(dto.getEmail())
                .username(dto.getUsername())
                .password(password)
                .imageUrl(null)
                .role(Member.Role.USER)
                .build();

        Long memberId = memberJpaRepository.save(member).getId();

        log.info("회원가입 성공");
        return memberId;
    }

    public MemberResponseDto read(Long memberId){
        Member member =  memberJpaRepository.findById(memberId)
                .orElseThrow( () -> new UsernameNotFoundException("존재하지 않은 유저입니다."));

        if(invaildMember(member)){
            log.info("회원탈퇴 된 사용자입니다.");
            return null;
        }

        log.info("회원조회 성공");
        return memberMapper.memberToMemberResponseDto(member);
    }

    public Long update(MemberUpdateDto dto, Long memberId){
        if(memberJpaRepository.findByMemberUsername(dto.getUsername()).isPresent()){
            log.info("Username 중복");
            return -2L;
        }

        Member member = memberJpaRepository.findById(memberId)
                .orElseThrow( () -> new UsernameNotFoundException("존재하지 않은 유저입니다."));

        if(invaildMember(member)){
            log.info("회원탈퇴 된 사용자입니다.");
            return null;
        }


        MemberRecord record = recordMember(member);

        if(dto.getUsername() != null)
            member.setUsername(dto.getUsername());
        if(dto.getImageUrl() != null)
            member.setImageUrl(dto.getImageUrl());

        memberRecordJpaRepository.save(record);
        memberJpaRepository.save(member);

        log.info("회원정보 수정 성공");
        return memberId;
    }

    public Long updatePassword(Long memberId, MemberPasswordUpdateDto dto){
        Member member = memberJpaRepository.findById(memberId).
                orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        if(invaildMember(member)){
            log.info("회원탈퇴 된 사용자입니다.");
            return null;
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String password = member.getPassword();
        String oldPassword = passwordEncoder.encode(dto.getOldPassword());

        if(!password.equals(oldPassword)){
            return null;
        }

        MemberRecord record = recordMember(member);
        member.setPassword(passwordEncoder.encode(dto.getNewPassword()));

        memberRecordJpaRepository.save(record);

        return memberJpaRepository.save(member).getId();
    }

    public Long delete(Long memberId) {
        Member member = memberJpaRepository.findById(memberId)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        if(invaildMember(member)){
            log.info("회원탈퇴 된 사용자입니다.");
            return null;
        }

        member.setActive(false);

        MemberRecord record = recordMember(member);

        memberRecordJpaRepository.save(record);
        memberJpaRepository.save(member);

        return memberId;
    }

    public MemberRecord recordMember(Member member){
        return MemberRecord.builder()
                .active(member.getActive())
                .username(member.getUsername())
                .email(member.getEmail())
                .imageUrl(member.getImageUrl())
                .role(member.getRole())
                .createAt(member.getModifiedAt())
                .member(member)
                .build();
    }

    public boolean invaildMember(Member member){
        return !member.getActive();
    }
}
