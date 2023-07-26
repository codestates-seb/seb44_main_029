package com.example.server.member.config;

import com.example.server.member.interceptor.HttpInterceptor;
import com.example.server.member.security.token.JwtTokenProvider;
import com.example.server.member.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final JwtTokenProvider tokenProvider;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HttpInterceptor(tokenProvider))
                .addPathPatterns("/tokens/**")
                .addPathPatterns("/members/**")
                .addPathPatterns("/contents/**")
                .addPathPatterns("/likes/**")
                .addPathPatterns("/theme/**")
                .addPathPatterns("/contentsUpload")
                .excludePathPatterns("/css/**", "/images/**", "/js/**");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("http://localhost:3030") // local content test
                .allowedOrigins("http://cozystates.com")
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("Access-Control-Allow-Origin");
    }
}
