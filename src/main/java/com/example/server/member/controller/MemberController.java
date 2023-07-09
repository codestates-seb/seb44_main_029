package com.example.server.member.controller;

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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final TokenService tokenService;

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
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response){
        String accessToken = request.getHeader("Access-Token");
        String refreshToken = request.getHeader("Refresh-Token");

        TokenResponse tokenResponse = TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        memberService.logout(tokenResponse);

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
}
