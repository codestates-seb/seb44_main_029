package com.example.server.content.mapper;

import com.example.server.content.dto.ContentResponseDto;
import com.example.server.content.entity.Content;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ContentMapper {

    default ContentResponseDto ContentToContentResponseDto(Content content){
        return ContentResponseDto.builder()
                .contentId(content.getContentId())
                .ContentTitle(content.getTitle())
                .themeTitle(content.getTheme().getTitle())
                .howManyLiked(content.getLikes().size())
                .build();
    }

    default ContentResponseDto ContentToContentResponseDto2(Content content){
        return ContentResponseDto.builder()
                .contentId(content.getContentId())
                .ContentTitle(content.getTitle())
                .themeTitle(content.getTheme().getTitle())
                .howManyLiked(content.getLikes().size())
                .build();
    }
}
