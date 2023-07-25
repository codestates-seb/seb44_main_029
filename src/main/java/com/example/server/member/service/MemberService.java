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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


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
    private final BCryptPasswordEncoder passwordEncoder;

    public MemberIdAndTokenDto login(MemberLoginDto dto){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String username = authentication.getName();

        Member member = memberJpaRepository.findByMemberUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 사용자입니다."));

        if(invaildMember(member)){
            log.info("회원탈퇴 된 사용자입니다.");
            return null;
        }

        boolean isGuest = true;
        if(!member.getUsername().equals("guest")) {
            isGuest = false;

            List<RefreshToken> checkList = refreshTokenJpaRepository.findByMemberId(member.getId());
            RefreshToken check = (checkList.isEmpty()) ? null : checkList.get(0);

            if (check != null && check.getActive()) {
                log.info("이미 로그인 한 사용자입니다.");

                RefreshToken refreshToken = refreshTokenJpaRepository.findByMemberId(member.getId()).get(0);
                refreshToken.setActive(false);
                refreshTokenJpaRepository.save(refreshToken);
                log.info("중복 로그인으로 인하여 로그인한 사용자를 로그아웃 하였습니다.");
                
                return MemberIdAndTokenDto.builder()
                        .memberId(-6L).build();
            }
        }

        String refreshToken = tokenService.createRefreshToken(username, isGuest);
        String accessToken = tokenProvider.createToken(authentication);

        MemberIdAndTokenDto response = MemberIdAndTokenDto.builder()
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .memberId(((Member) authentication.getPrincipal()).getId())
                .build();

        return response;
    }

    public Boolean logout(MemberIdAndTokenDto dto){
        Member member = memberJpaRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 사용자입니다."));

        if(invaildMember(member)){
            log.info("회원탈퇴 된 사용자입니다.");
            return null;
        }

        List<RefreshToken> refreshTokens = refreshTokenJpaRepository.findByMemberId(dto.getMemberId());

        RefreshToken refreshToken = refreshTokens.stream()
                .filter(token -> token.getToken().equals(dto.getRefreshToken()))
                .findFirst()
                .orElse(null);

        if(refreshToken != null){
            refreshToken.setActive(false);

            BlackList blackList = BlackList.builder()
                    .accessToken(dto.getAccessToken())
                    .build();

            refreshTokenJpaRepository.save(refreshToken);
            blackListJpaRepository.save(blackList);
        }else{
            throw new RuntimeException("Refresh Token is not exist");
        }

        log.info("로그아웃 완료");
        return true;
    }

    public Long signUp(MemberSignUpDto dto){
        Member isEmailPresent = memberJpaRepository.findByMemberEmail(dto.getEmail()).orElse(null);
        Member isUsernamePresent = memberJpaRepository.findByMemberUsername(dto.getUsername()).orElse(null);

        if((isEmailPresent != null && isEmailPresent.getActive()) && (isEmailPresent != null && isUsernamePresent.getActive())){
            log.info("Email, Username 중복");
            return -3L;
        }
        else if(isEmailPresent != null && isEmailPresent.getActive()){
            log.info("Email 중복");
            return -2L;
        }else if(isEmailPresent != null && isUsernamePresent.getActive()){
            log.info("Username 중복");
            return -1L;
        }

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
        Member isPresentMember = memberJpaRepository.findByMemberUsername(dto.getUsername()).orElse(null);

        if(isPresentMember != null && isPresentMember.getActive()){
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

        String password = member.getPassword();
        String oldPassword = dto.getOldPassword();

        if(!passwordEncoder.matches(oldPassword, password)){
            return -4L;
        }

        return memberJpaRepository.save(member).getId();
    }

    public Long delete(Long memberId) {
        Member member = memberJpaRepository.findById(memberId)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        if(member.getUsername().equals("guest") || member.getUsername().equals("admin")){
            log.info("해당 계정은 삭제할 수 없습니다.");
            return -5L;
        }

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
