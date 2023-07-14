package com.example.server.member.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    Long memberId;
    String refreshToken;
}
