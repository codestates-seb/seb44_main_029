package com.example.server.member.controller;

import com.example.server.MusicResources.S3Config;
import com.example.server.member.dto.*;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.service.MemberService;
import com.example.server.member.service.TokenService;
import com.example.server.music.controller.MusicController;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Tag(name = "MemberController", description = "API about Member")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/get")
    public String get(){
        return new BCryptPasswordEncoder().encode("guest123!@#");
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated MemberLoginDto dto, HttpServletResponse response){
        MemberIdAndTokenDto tokenAndId = memberService.login(dto);

        if(tokenAndId == null) return new ResponseEntity<>(null, HttpStatus.ACCEPTED);

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
                .memberId((Long) request.getAttribute("memberId"))
                .build();

        Boolean response = memberService.logout(memberIdAndTokenDto);

        if(response == true)
            SecurityContextHolder.clearContext();

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping("")
    ResponseEntity signUp(@RequestBody @Validated MemberSignUpDto dto){
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
    ResponseEntity update(@RequestBody @Validated MemberUpdateDto dto, @PathVariable("member-id") Long memberId){
        Long response = memberService.update(dto, memberId);

        if(response < 1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/password/{member-id}")
    ResponseEntity updatePassword(@PathVariable("member-id") Long memberId, @RequestBody @Validated MemberPasswordUpdateDto dto){
        Long response = memberService.updatePassword(memberId, dto);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    ResponseEntity delete(@PathVariable("member-id") Long memberId){
        Long response = memberService.delete(memberId);

        if(response == -5) return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
