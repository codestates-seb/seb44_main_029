package com.example.server.content.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ContentResponseDto {

    Long contentId;

    String ContentTitle;

    String ContentUri;

    String themeTitle;

    Integer howManyLiked;
}
