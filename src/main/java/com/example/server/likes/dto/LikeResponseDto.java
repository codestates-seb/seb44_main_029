package com.example.server.likes.dto;

import com.example.server.content.entity.Content;
import com.example.server.member.entity.Member;
import lombok.Getter;

@Getter
public class LikeResponseDto {
    public long likeId;
    public Member member;
    public Content content;
}
