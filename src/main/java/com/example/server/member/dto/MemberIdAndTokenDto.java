package com.example.server.member.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberIdAndTokenDto {
    String refreshToken;
    String accessToken;
    Long memberId;
}
