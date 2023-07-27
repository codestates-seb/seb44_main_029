package com.example.server.theme.service;

import com.example.server.content.dto.ContentPageDto;
import com.example.server.content.entity.Content;
import com.example.server.content.service.ContentService;
import com.example.server.theme.entity.Theme;
import com.example.server.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class ThemeServiceImpl implements ThemeService{
    public final ThemeRepository themeRepository;
    public final ContentService contentService;

    public ResponseEntity<?> themeResponse(
            Long themeId, HttpServletRequest request, int page, int size, String criteria, String sort){
        Long memberId = (Long) request.getAttribute("memberId");

        Page<Content> contentsPage = contentService.contentPagination(
                contentService.getContentByTheme(themeId), page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentService.contentsResponse(contentsPage,memberId), contentsPage), HttpStatus.OK);
    }

    @Override
    public List<Theme> getThemes() {
        return themeRepository.findAll();
    }
}
