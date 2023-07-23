package com.example.server.member.Mapper;

import com.example.server.member.dto.MemberResponseDto;
import com.example.server.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2023-07-21T21:36:51+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.15 (Amazon.com Inc.)"
=======
    date = "2023-07-21T20:27:17+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Amazon.com Inc.)"
>>>>>>> dev
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public MemberResponseDto memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDto.MemberResponseDtoBuilder memberResponseDto = MemberResponseDto.builder();

        memberResponseDto.username( member.getUsername() );
        memberResponseDto.email( member.getEmail() );
        memberResponseDto.imageUrl( member.getImageUrl() );

        return memberResponseDto.build();
    }
}
