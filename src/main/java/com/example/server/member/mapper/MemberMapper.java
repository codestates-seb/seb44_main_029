package com.example.server.member.mapper;

import com.example.server.member.dto.MemberResponseDto;
import com.example.server.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    MemberResponseDto MemberToMemberResponseDto(Member member);
}
