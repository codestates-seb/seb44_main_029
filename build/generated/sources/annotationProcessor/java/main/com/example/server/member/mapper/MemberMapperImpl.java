package com.example.server.member.Mapper;

import com.example.server.member.dto.MemberResponseDto;
import com.example.server.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    date = "2023-07-21T21:36:51+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.15 (Amazon.com Inc.)"
=======
    date = "2023-07-21T20:27:17+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Amazon.com Inc.)"
>>>>>>> dev
=======
<<<<<<< HEAD
    date = "2023-07-22T14:28:35+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
=======
    date = "2023-07-22T21:23:39+0900",
=======
    date = "2023-07-23T17:34:44+0900",
>>>>>>> back_dev_member2
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Amazon.com Inc.)"
>>>>>>> 5dfd2a83495541a318f66a319de59c926a44b7ec
>>>>>>> b74be7d40b85436e336232e693cf6780bb4d0a88
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
