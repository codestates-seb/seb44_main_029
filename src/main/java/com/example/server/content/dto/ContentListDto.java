package com.example.server.content.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ContentListDto {

    private ContentResponseDto contentResponseDto;

    private List<Long> contentIds;

    public ContentListDto(ContentResponseDto contentResponseDto, List<Long> contentIds){
        this.contentResponseDto = contentResponseDto;
        this.contentIds = contentIds;
    }
}
