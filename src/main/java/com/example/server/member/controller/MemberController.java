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
import org.springframework.http.HttpHeaders;
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


    @GetMapping("/success")
    public ResponseEntity success(HttpServletRequest request, HttpServletResponse response){
        String refreshToken = response.getHeader("Refresh-Token");
        return new ResponseEntity("ok", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody MemberLoginDto dto, HttpServletResponse response){
        MemberIdAndTokenDto tokenAndId = memberService.login(dto);

        response.setHeader(HttpHeaders.AUTHORIZATION, tokenAndId.getAccessToken());

        ResponseDto responseDto = ResponseDto.builder()
                .memberId(tokenAndId.getMemberId())
                .refreshToken(tokenAndId.getRefreshToken())
                .build();

        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request){
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7);
//        String refreshToken = request.getHeader("Refresh-Token");

        MemberIdAndTokenDto memberIdAndTokenDto = MemberIdAndTokenDto.builder()
                .accessToken(accessToken)
//                .refreshToken(refreshToken)
                .build();

        memberService.logout(memberIdAndTokenDto);

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
    ResponseEntity read(@PathVariable("member-id") Long memberId, HttpServletRequest request){
        Long requestId = (Long) request.getAttribute("memberId");
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

        MemberResponseDto response = memberService.read(memberId);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    ResponseEntity update(@RequestBody MemberUpdateDto dto, @PathVariable("member-id") Long memberId,
                          HttpServletRequest request){
        Long requestId = (Long) request.getAttribute("memberId");
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

        Long response = memberService.update(dto, memberId);

        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/password/{member-id}")
    ResponseEntity updatePassword(@PathVariable("member-id") Long memberId, @RequestBody MemberPasswordUpdateDto dto,
                                  HttpServletRequest request){
        Long requestId = (Long) request.getAttribute("memberId");
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

        Long response = memberService.updatePassword(memberId, dto);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    ResponseEntity delete(@PathVariable("member-id") Long memberId, HttpServletRequest request){
        Long requestId = (Long) request.getAttribute("memberId");
        if(!memberService.isRequesterSameOwner(requestId, memberId))
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);

        memberService.delete(memberId);

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
