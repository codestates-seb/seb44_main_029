package com.example.server.member.security.oauth.dto;

import com.example.server.member.entity.Member;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OauthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String image;

    public static OauthAttributes of(String registrationId, String usernameAttributeName, Map<String, Object> attributes){
        return ofGoogle(usernameAttributeName, attributes);
    }

    private static OauthAttributes ofGoogle(String usernameAttributeName, Map<String, Object> attributes){
        return OauthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .image((String) attributes.get("iamge"))
                .attributes(attributes)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    public Member toEntity(){
        return Member.builder()
                .username(name)
                .email(email)
                .role(Member.Role.USER)
                .build();
    }
}
