package com.example.server.content.controller;

import com.example.server.content.mapper.ContentMapper;
import com.example.server.content.repository.ContentRepository;
import com.example.server.content.service.ContentServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
@Validated
@Slf4j
public class ContentController {
    public final ContentMapper contentMapper;
    public final ContentServiceImpl contentService;
    public final ContentRepository contentRepository;

    @GetMapping("/{content-id}")
    public ResponseEntity getContent(@Positive @PathVariable("content-id") Long contentId,
                                     HttpServletRequest request){
        return new ResponseEntity<>(contentService.contentResponse(contentId, request), HttpStatus.OK);
    }

    @JsonIgnore
    @GetMapping("/likes")
    public ResponseEntity getLikes(
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "5", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        return contentService.likeResponse(request, page, size, criteria, sort);
    }

    @GetMapping("/likes/{theme-id}")
    public ResponseEntity getLikesTheme(
            @Positive @PathVariable("theme-id") Long themeId,
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "5", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        return contentService.likeThemeResponse(themeId, request, page, size, criteria, sort);
    }

}


