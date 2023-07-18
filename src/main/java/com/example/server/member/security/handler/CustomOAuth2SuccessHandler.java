package com.example.server.member.security.handler;

import com.example.server.member.dto.MemberIdAndTokenDto;
import com.example.server.member.dto.ResponseDto;
import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.security.token.JwtTokenProvider;
import com.example.server.member.service.TokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
// import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Value("${jwt.refresh_token_expired}")
    long refreshTokenExpired;
    private final MemberJpaRepository memberJpaRepository;
    private final JwtTokenProvider tokenProvider;
    private final TokenService tokenService;
    

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String username = oAuth2User.getAttribute("name");


        Member member = memberJpaRepository.findByMemberUsername(username).get();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

        String refreshToken = tokenService.createRefreshToken(username);
        String accessToken = tokenProvider.createToken(authenticationToken);

    

        ResponseDto responseDto = ResponseDto.builder()
                .memberId(member.getId())
                .refreshToken(refreshToken)
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(responseDto);

        response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);

        String uri = createURI(request, accessToken, refreshToken, member.getId().toString()).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
//        response.setContentType("application/json");
//        response.getWriter().write(jsonResponse);
    }

    public URI createURI(HttpServletRequest request, String accessToken, String refreshToken, String memberId){
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("authorization", accessToken);
        params.add("refresh-token", refreshToken);
        params.add("memberId", memberId);

        String serverName = request.getServerName();

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000)
                .path("/oauthloading")
                .queryParams(params)
                .build()
                .toUri();
    }
}
