package com.example.server.member.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponseDto {
    Long id;
    String username;
    Integer HowManyLiked;
}
