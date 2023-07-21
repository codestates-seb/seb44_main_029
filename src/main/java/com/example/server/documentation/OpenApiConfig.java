package com.example.server.documentation;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
/*
    @Bean
    public GroupedOpenApi group1() {
        return GroupedOpenApi.builder()
                .group("그룹1")
                .pathsToMatch("/content/**")
                .packagesToScan("com.example.server.content") // package 필터 설정
                .build();
    }

    @Bean
    public GroupedOpenApi group2() {
        return GroupedOpenApi.builder()
                .group("그룹2")
                .pathsToMatch("/member/**")
                .build();
    }
*/
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("Spring Boot API Example")
                .description("Spring Boot API 예시 프로젝트입니다.")
                .version("v0.0.1");

        // SecuritySecheme명
        String jwtSchemeName = "jwtAuth";
        // API 요청헤더에 인증정보 포함
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);
        // SecuritySchemes 등록
        Components components = new Components()
                .addSecuritySchemes(jwtSchemeName, new SecurityScheme()
                        .name(jwtSchemeName)
                        .type(SecurityScheme.Type.HTTP) // HTTP 방식
                        //.type(SecurityScheme.Type.OAUTH2) //OAUTH2
                        .scheme("bearer")
                        .bearerFormat("JWT")); // 토큰 형식을 지정하는 임의의 문자(Optional)

        Components components2 = new Components()
                .addSecuritySchemes(jwtSchemeName, new SecurityScheme()
                        .name(jwtSchemeName)
                        .type(SecurityScheme.Type.OAUTH2) // HTTP 방식
                        //.type(SecurityScheme.Type.OAUTH2) //OAUTH2
                        .scheme("bearer")
                        .bearerFormat("JWT")); // 토큰 형식을 지정하는 임의의 문자(Optional)

        return new OpenAPI()
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}

