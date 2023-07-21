package com.example.server.member.interceptor;

import com.example.server.member.security.token.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class HttpInterceptor implements HandlerInterceptor{
    private final JwtTokenProvider tokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        response.setHeader(HttpHeaders.AUTHORIZATION, accessToken);

        log.info("Header에 Refresh-Token, Access-Token 삽입");

        Long memberId = null;

        if(accessToken != null) {
            if (!accessToken.equals("Bearer null")) {

                accessToken = accessToken.substring(7); //Bearer 제거

                if (request.getRequestURI().contains("tokens")) {
                    try {
                        memberId = Long.valueOf(tokenProvider.getSubjectFromToken(accessToken));
                    } catch (ExpiredJwtException expiredJwtException) {
                    }
                } else {
                    memberId = Long.valueOf(tokenProvider.getSubjectFromToken(accessToken));
                }

                request.setAttribute("memberId", memberId);
            }
        }

        Map<String, Object> map = (Map<String, Object>) request.getAttribute(
                HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE
        );

        if(map.get("member-id") != null){
            Long requestId = Long.valueOf((String) map.get("member-id"));

            if(memberId != requestId ){
                log.info("요청자와 자원소유자가 다릅니다.");
                response.sendError(202, "요청자와 자원소유자가 다릅니다.");
                return memberId == requestId;
            }
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
