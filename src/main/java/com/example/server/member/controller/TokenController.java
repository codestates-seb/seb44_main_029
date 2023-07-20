package com.example.server.member.controller;

import com.example.server.member.dto.MemberIdAndTokenDto;
import com.example.server.member.dto.RefreshTokenDto;
import com.example.server.member.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RequiredArgsConstructor
@RestController
@RequestMapping("/tokens")
public class TokenController {
    private final TokenService tokenService;

    @PostMapping("")
    public ResponseEntity updateToken(@RequestBody RefreshTokenDto refreshToken, HttpServletRequest request, HttpServletResponse response){
//        Long memberId = (Long) request.getAttribute("memberId");
        String token = tokenService.updateAccessToken(refreshToken);

        if(token == null) return new ResponseEntity("Refresh Token이 존재하지 않습니다.", HttpStatus.FORBIDDEN);
        response.setHeader(HttpHeaders.AUTHORIZATION, token);

        return new ResponseEntity(HttpStatus.OK);
    }
}
