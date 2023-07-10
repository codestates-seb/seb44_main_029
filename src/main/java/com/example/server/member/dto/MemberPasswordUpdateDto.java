package com.example.server.member.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberPasswordUpdateDto {
    String oldPassword;
    String newPassword;
}
