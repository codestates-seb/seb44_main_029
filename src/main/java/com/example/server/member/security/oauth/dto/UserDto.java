package com.example.server.member.security.oauth.dto;

import com.example.server.member.entity.Member;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    private Long id;
    private String username;
    private String email;

    public UserDto(Member member){
        this.username = member.getUsername();
        this.email = member.getEmail();
    }
}
