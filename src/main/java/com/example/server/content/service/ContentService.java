package com.example.server.content.service;


import com.example.server.content.dto.ContentResponseDto;
import com.example.server.content.entity.Content;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContentService {
    List<Content> getContentByTheme(Long themeId);

    List<Content> getLikes(Long memberId);

    Page<Content> contentPagination(List<Content> contents, int page, int size, String criteria, String sort);

    String getContentUrl(long themeId, long contentId);

    String getContentFileUrl(String fileName);

    List<ContentResponseDto> contentsResponse(List<Content> contents, Long memberId);
}
