<<<<<<< HEAD
package com.example.server.member.Mapper;

import com.example.server.member.dto.MemberResponseDto;
import com.example.server.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-20T15:04:19+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Amazon.com Inc.)"
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
=======
package com.example.server.member.Mapper;

import com.example.server.member.dto.MemberResponseDto;
import com.example.server.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-20T11:21:56+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
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
>>>>>>> a6e2750d6861ac975a3373930f4d76576af22e27
