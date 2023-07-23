package com.example.server.member.controller;

import com.example.server.member.dto.MemberIdAndTokenDto;
import com.example.server.member.dto.RefreshTokenDto;
import com.example.server.member.service.TokenService;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "TokenController", description = "API about Token")
public class TokenController {
    private final TokenService tokenService;

    @PostMapping("")
    public ResponseEntity updateToken(@RequestBody RefreshTokenDto refreshToken, HttpServletResponse response){
        String token = tokenService.updateAccessToken(refreshToken);

        if(token == null) return new ResponseEntity("Refresh Token이 존재하지 않습니다.", HttpStatus.UNAUTHORIZED);
        response.setHeader(HttpHeaders.AUTHORIZATION, token);

        return new ResponseEntity(HttpStatus.OK);
    }
}
