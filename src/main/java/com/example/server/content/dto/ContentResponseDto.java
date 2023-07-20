package com.example.server.content.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ContentResponseDto {

    Long contentId;

    String ContentTitle;

    String ContentUri;

    Long themeId;

    String themeTitle;

    Integer howManyLiked;

    Boolean liked;
}
