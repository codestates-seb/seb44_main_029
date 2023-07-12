package com.example.server.theme.dto;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThemeResponseDto {
    Long themeId;

    String title;

    String themeImageUri;
}
