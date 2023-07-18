package com.example.server.content.service;


import com.example.server.content.dto.ContentListDto;
import com.example.server.content.dto.ContentResponseDto;
import com.example.server.content.entity.Content;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public interface ContentService {
    List<Content> getContentByTheme(Long themeId);

    List<Content> getLikes(Long memberId);

    Page<Content> contentPagination(List<Content> contents, int page, int size, String criteria, String sort);

    String getContentUrl(long themeId, long contentId);

    String getContentFileUrl(String fileName);

    //List<ContentResponseDto> contentsResponse(Page<Content> contents, Long memberId);

    List<ContentResponseDto> contentsResponse(Page<Content> contents, HttpServletRequest request);

    //ContentListDto contentResponse(Long contentId, Long memberId);

    ContentListDto contentResponse(Long contentId, HttpServletRequest request);
/*
    ContentListDto likedContentResponse(Long contentId, Long memberId);
 */
}
