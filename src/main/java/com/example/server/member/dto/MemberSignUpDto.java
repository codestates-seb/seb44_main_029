package com.example.server.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignUpDto {
    @Email
    String email;
    String username;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$")
    String password;
}
