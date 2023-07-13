package com.example.server.member.dto;

import com.example.server.member.entity.Member;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponseDto {
    String username;
    String email;
    String imageUrl;
}
