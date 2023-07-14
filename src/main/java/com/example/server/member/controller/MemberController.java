package com.example.server.member.controller;

import com.example.server.MusicResources.S3Config;
import com.example.server.member.dto.*;
import com.example.server.member.entity.Member;
import com.example.server.member.service.MemberService;
import com.example.server.member.service.TokenService;
import com.example.server.music.controller.MusicController;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);


    @PostMapping("/success")
    public ResponseEntity success(){
        return new ResponseEntity("ok", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody MemberLoginDto dto, HttpServletResponse response){
        TokenResponse token = memberService.login(dto);

        response.setHeader("Refresh-Token", token.getRefreshToken());
        response.setHeader("Access-Token", token.getAccessToken());

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request){
        logger.info("로그아웃 진입");
        String accessToken = request.getHeader("Access-Token");
        String refreshToken = request.getHeader("Refresh-Token");
        logger.info("토큰 헤더에서 추출완료");
        TokenResponse tokenResponse = TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        logger.info("토큰 빌더 생성 완료");
        memberService.logout(tokenResponse);
        logger.info("로그아웃 서비스계층 전달 완료");
        SecurityContextHolder.clearContext();

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("")
    ResponseEntity signUp(@RequestBody MemberSignUpDto dto){
        Long response = memberService.signUp(dto);

        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}")
    ResponseEntity read(@PathVariable("member-id") Long memberId, HttpServletRequest request){
        Long requestId = Long.valueOf((Integer) request.getAttribute("memberId"));
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

        MemberResponseDto response = memberService.read(memberId);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    ResponseEntity update(@RequestBody MemberUpdateDto dto, @PathVariable("member-id") Long memberId,
                          HttpServletRequest request){
        Long requestId = Long.valueOf((Integer) request.getAttribute("memberId"));
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

        Long response = memberService.update(dto, memberId);

        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/password/{member-id}")
    ResponseEntity updatePassword(@PathVariable("member-id") Long memberId, @RequestBody MemberPasswordUpdateDto dto,
                                  HttpServletRequest request){
        Long requestId = Long.valueOf((Integer) request.getAttribute("memberId"));
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

        Long response = memberService.updatePassword(memberId, dto);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    ResponseEntity delete(@PathVariable("member-id") Long memberId, HttpServletRequest request){
        Long requestId = Long.valueOf((Integer) request.getAttribute("memberId"));
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

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
