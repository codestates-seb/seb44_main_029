package com.example.server.member.interceptor;

import com.example.server.member.security.token.JwtTokenProvider;
import com.example.server.member.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class HttpInterceptor implements HandlerInterceptor{
    private final JwtTokenProvider tokenProvider;
    private final TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String refreshToken = request.getHeader("Refresh-Token");

        response.setHeader("Refresh-Token", refreshToken);
        response.setHeader(HttpHeaders.AUTHORIZATION, accessToken);

        log.info("Header에 Refresh-Token, Access-Token 삽입");

        if(accessToken != null){
            accessToken = accessToken.substring(7); //Bearer 제거
            Long memberId = Long.valueOf(tokenProvider.getSubjectFromToken(accessToken));

            request.setAttribute("memberId", memberId);
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
