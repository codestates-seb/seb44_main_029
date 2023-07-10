package com.example.server.member.service;


import com.example.server.member.Mapper.MemberMapper;
import com.example.server.member.dto.*;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.security.token.JwtTokenProvider;
import com.example.server.music.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
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
    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;



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
        //member.setPassword(dto.getPassword());
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

    // 회원 프로필 이미지 객체 리스트 가져오는 메소드
//    public List<byte[]> profileImageList(){
//        try{
//            List<byte[]> imageList = new ArrayList<>();
//            String pre = "memberProfile";
//            // 이미지에 해당하는 파일 가져오기
//            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
//                    .bucket(bucketName)
//                    .prefix(pre)
//                    .build();
//
//            ListObjectsResponse response = s3Client.listObjects(listObjectsRequest);
//            for(S3Object s3Object : response.contents()){
//                GetObjectRequest getObjectRequest = GetObjectRequest.builder()
//                        .bucket(bucketName)
//                        .key(s3Object.key())
//                        .build();
//                ResponseBytes<GetObjectResponse> responseBytes = s3Client.getObjectAsBytes(getObjectRequest);
//                byte[] image = responseBytes.asByteArray();
//                imageList.add(image);
//            }
//            return imageList;
//        }catch (SdkException e){
//            throw new RuntimeException("이미지 list 반환 실패: " + e.getMessage(), e);
//        }

    // 객체 형태가 아닌 url로 이미지 리스트 전달
    public List<String> profileImageList(){
        try{
            List<String> imageList = new ArrayList<>();
            String pre = "memberProfile";
            // 이미지에 해당하는 파일 가져오기
            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                    .bucket(bucketName)
                    .prefix(pre)
                    .build();

            ListObjectsResponse response = s3Client.listObjects(listObjectsRequest);
            for(S3Object s3Object : response.contents()){
                GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                        .bucket(bucketName)
                        .key(s3Object.key())
                        .build();

                String url = s3Client.utilities().getUrl(getUrlRequest).toExternalForm();
                imageList.add(url);
            }
            return imageList;
        }catch (SdkException e){
            throw new RuntimeException("이미지 list 반환 실패: " + e.getMessage(), e);
        }
    }

    // 회원 이미지 업데이트
    public Long ImageUpdate(MemberImageUpdateDto dto, Long memberId){
        //이미지가 null이라면 회원 rds에(db) s3의 url 저장
        // 이미지가 이미 있다면 기존 url 삭제 후 새로운 url 저장
        // rds 변경사항 저장
        Member member = memberJpaRepository.findById(memberId)
                .orElseThrow( () -> new UsernameNotFoundException("존재하지 않은 유저입니다."));
        member.setImageUrl(dto.getImageUrl());
        memberJpaRepository.save(member);
        return memberId;
    }
}
