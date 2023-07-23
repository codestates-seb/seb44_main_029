package com.example.server.member.dto;

import lombok.*;

import javax.validation.constraints.Pattern;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberPasswordUpdateDto {
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$")
    String oldPassword;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$")
    String newPassword;
}
