package com.example.server.theme.dto;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThemeResponseDto {
    // theme 리스트를 theme 레포에서 긁어오고,
    // 각 theme에 해당하는 대표 이미지를 찾아서 그 파일의 url을 같이 반환.
    Long themeId;

    String title;

    String themeImageUri;
}
