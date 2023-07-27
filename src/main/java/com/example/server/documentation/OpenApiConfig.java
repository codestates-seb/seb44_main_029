package com.example.server.documentation;

import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
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
        Info info = new Info().title("Project CozyStates")
                .description("Main team 029의 프로젝트 CozyStates API 문서입니다.")
                .version("v1.0.0")
                .termsOfService("Team 029");

        // SecuritySecheme명
        String jwtSchemeName = "jwtAuth";
        String OAuth = "OAuth 2.0";
        // API 요청헤더에 인증정보 포함
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName, OAuth);
        // SecuritySchemes 등록
        Components components = new Components()
                .addSecuritySchemes(jwtSchemeName, new SecurityScheme()
                        .name(jwtSchemeName)
                        .type(SecurityScheme.Type.HTTP) // HTTP 방식
                        .scheme("bearer")
                        .bearerFormat("JWT")); // 토큰 형식을 지정하는 임의의 문자(Optional)
/*
        Components components2 = new Components()
                .addSecuritySchemes(OAuth, new SecurityScheme()
                        .name(OAuth)
                        .type(SecurityScheme.Type.OAUTH2) //OAUTH2
                        .flows(new OAuthFlows()
                                .clientCredentials(new OAuthFlow()
                                        .tokenUrl("http://www.google.com"+"/oauth/token"))));
*/

        return new OpenAPI()
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}

