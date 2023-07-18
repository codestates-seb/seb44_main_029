package com.example.server.theme.mapper;

import com.example.server.theme.dto.ThemePostDto;
import com.example.server.theme.dto.ThemeResponseDto;
import com.example.server.theme.entity.Theme;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ThemeMapper {
    default List<ThemeResponseDto> ThemesToThemeResponseDtos(List<Theme> themes){
        return themes.stream().map(Theme -> ThemeResponseDto.builder()
                .themeId(Theme.getThemeId())
                .title(Theme.getTitle())
                .build()).collect(Collectors.toList());
    }

    // Theme ThemePostDtoToTheme(ThemePostDto themePostDto);
}
