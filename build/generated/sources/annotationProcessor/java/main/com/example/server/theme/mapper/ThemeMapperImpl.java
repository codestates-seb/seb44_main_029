package com.example.server.theme.mapper;

import com.example.server.theme.dto.ThemePostDto;
import com.example.server.theme.entity.Theme;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-14T21:53:59+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
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
