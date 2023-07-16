package com.example.server.member.Mapper;

import com.example.server.member.dto.MemberResponseDto;
import com.example.server.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2023-07-14T16:10:58+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
=======
    date = "2023-07-14T15:13:32+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
>>>>>>> 2e2b0ffc8c0247f6090536044eef1da0545efc05
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
