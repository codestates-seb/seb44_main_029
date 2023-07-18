package com.example.server.member.controller;

import com.example.server.MusicResources.S3Config;
import com.example.server.member.dto.*;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
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
import java.util.UUID;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

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
    public ResponseEntity logout(@RequestBody RefreshTokenDto refreshToken, HttpServletRequest request){
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7);

        MemberIdAndTokenDto memberIdAndTokenDto = MemberIdAndTokenDto.builder()
                .refreshToken(refreshToken.getRefreshToken())
                .accessToken(accessToken)
                .build();

        memberService.logout(memberIdAndTokenDto);

        SecurityContextHolder.clearContext();

        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PostMapping("")
    ResponseEntity signUp(@RequestBody MemberSignUpDto dto){
        Long response = memberService.signUp(dto);

        if(response < 1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
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

        if(response < 1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/password/{member-id}")
    ResponseEntity updatePassword(@PathVariable("member-id") Long memberId, @RequestBody MemberPasswordUpdateDto dto){
        Long response = memberService.updatePassword(memberId, dto);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    ResponseEntity delete(@PathVariable("member-id") Long memberId){
        memberService.delete(memberId);

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
