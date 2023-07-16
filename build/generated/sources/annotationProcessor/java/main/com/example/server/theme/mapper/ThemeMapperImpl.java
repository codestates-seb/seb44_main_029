package com.example.server.theme.mapper;

import com.example.server.theme.dto.ThemePostDto;
import com.example.server.theme.entity.Theme;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2023-07-14T15:41:43+0900",
=======
<<<<<<< HEAD
    date = "2023-07-14T16:10:58+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
=======
    date = "2023-07-14T15:13:32+0900",
>>>>>>> 42a9a96509d878cea9f87eed96c45c2399e7551f
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
>>>>>>> 2e2b0ffc8c0247f6090536044eef1da0545efc05
)
@Component
public class ThemeMapperImpl implements ThemeMapper {

    @Override
    public Theme ThemePostDtoToTheme(ThemePostDto themePostDto) {
        if ( themePostDto == null ) {
            return null;
        }

        Theme.ThemeBuilder theme = Theme.builder();

        theme.title( themePostDto.getTitle() );

        return theme.build();
    }
}
