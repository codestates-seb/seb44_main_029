package com.example.server.member.controller;

import com.example.server.member.entity.RefreshToken;
import com.example.server.member.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tokens")
public class TokenController {
    private final TokenService tokenService;
    private final RefreshToken refreshToken;

    @GetMapping("")
    public ResponseEntity updateToken(Authentication authentication){
        String username = authentication.getName();
        String token = tokenService.updateAccessToken(username);

        return new ResponseEntity(token, HttpStatus.OK);
    }
}
