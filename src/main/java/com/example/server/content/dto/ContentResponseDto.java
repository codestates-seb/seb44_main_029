package com.example.server.content.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ContentResponseDto {

    Long contentId;

    String ContentTitle;

    String ContentUri;

    String themeTitle;

    Integer howManyLiked;

    Boolean liked;
}
