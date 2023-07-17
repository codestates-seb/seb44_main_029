package com.example.server.member.dto;

import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignUpDto {
    String email;
    String username;
    String password;
}
