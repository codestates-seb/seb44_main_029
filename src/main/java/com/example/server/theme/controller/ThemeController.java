package com.example.server.theme.controller;

import com.example.server.content.dto.ContentPageDto;
import com.example.server.content.entity.Content;
import com.example.server.content.mapper.ContentMapper;
import com.example.server.content.service.ContentServiceImpl;
import com.example.server.theme.mapper.ThemeMapper;
import com.example.server.theme.service.ThemeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/theme")
@Validated
@Slf4j
public class ThemeController {
    public final ThemeMapper themeMapper;
    public final ThemeServiceImpl themeService;
    public final ContentServiceImpl contentService;
    public final ContentMapper contentMapper;


    @GetMapping("/{theme_id}")
    public ResponseEntity getContentByTheme(
            @Valid @PathVariable("theme_id") Long themeId,
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "5", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        Page<Content> contentsPage = contentService.contentPagination(contentService.getContentByTheme(themeId), page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentService.contentsResponse(contentsPage,request), contentsPage), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getThemes(){

        return new ResponseEntity<>(themeMapper.ThemesToThemeResponseDtos(themeService.getThemes()), HttpStatus.OK);
    }
}
