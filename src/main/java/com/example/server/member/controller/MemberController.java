package com.example.server.member.controller;

import com.example.server.MusicResources.S3Config;
import com.example.server.member.dto.*;
import com.example.server.member.entity.Member;
import com.example.server.member.service.MemberService;
import com.example.server.member.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final TokenService tokenService;
    private final S3Config s3Config;

    @PostMapping("/success")
    public ResponseEntity success(){
        return new ResponseEntity("ok", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody MemberLoginDto dto, HttpServletResponse response){
        TokenResponse token = memberService.login(dto);

        response.setHeader("Refresh-Token", token.getRefreshToken());
        response.setHeader("Access-Token", token.getAccessToken());

        return new ResponseEntity(token, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response){
        String accessToken = request.getHeader("accessToken");
        String refreshToken = request.getHeader("requestToken");

        TokenResponse tokenResponse = TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        memberService.logout(tokenResponse);

        SecurityContextHolder.clearContext();

        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PostMapping("")
    ResponseEntity signUp(@RequestBody MemberSignUpDto dto){
        Long response = memberService.signUp(dto);

        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}")
    ResponseEntity read(@PathVariable("member-id") Long memberId){
        MemberResponseDto response = memberService.read(memberId);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    ResponseEntity update(@RequestBody MemberUpdateDto dto, @PathVariable("member-id") Long memberId){
        Long response = memberService.update(dto, memberId);

        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    ResponseEntity delete(@PathVariable("member-id") Long memberId){
        memberService.delete(memberId);

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    /**
     * 회원 프로필 이미지 갱신 > 위에 update 부분에 dto로 전달받음
     * rds에 저장할지
     * */
    @PatchMapping("/{member-id}/imageChange")
    public ResponseEntity updateProfileImage(@RequestBody MemberImageUpdateDto dto, @PathVariable("member-id")Long memberId){
        // 헤더에서 전달받은 jwt의 memberId 가져옴. > 인터셉터 사용해도 될 듯
        // 회원인지 확인 후 이미지 선택.
        Long response = memberService.ImageUpdate(dto, memberId);
        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);

    }

    //회원 프로필 이미지 리스트 조회
    @GetMapping("/profileImageList")
    public ResponseEntity profileImageList(){
        // 헤더의 액세스 토큰을 통해 회원인지 판단하고
        // s3에서 해당 기본 이미지 객체 리스트 전달
        try{
            List<String> objects = memberService.profileImageList();
            return ResponseEntity.ok(objects);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("이미지객체 list 반환에 실패했습니다: " + e.getMessage());
        }
    }
}
