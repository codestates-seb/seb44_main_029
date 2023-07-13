package com.example.server.member.controller;

import com.example.server.member.dto.TokenResponse;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RequiredArgsConstructor
@RestController
@RequestMapping("/tokens")
public class TokenController {
    private final TokenService tokenService;

    @GetMapping("/{username}")
    public ResponseEntity updateToken(@PathVariable("username") String username, HttpServletResponse response){
        TokenResponse token = tokenService.updateAccessToken(username);
        response.setHeader("Refresh-Token", token.getRefreshToken());
        response.setHeader("Access-Token", token.getAccessToken());

        return new ResponseEntity(HttpStatus.OK);
    }
}
