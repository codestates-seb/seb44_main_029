package com.example.server.content.controller;

import com.example.server.content.dto.ContentPageDto;
import com.example.server.content.entity.Content;
import com.example.server.content.mapper.ContentMapper;
import com.example.server.content.repository.ContentRepository;
import com.example.server.content.service.ContentServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
@Validated
@Slf4j
public class ContentController {
    public final ContentMapper contentMapper;
    public final ContentServiceImpl contentService;
    public final ContentRepository contentRepository;
/*
    @GetMapping("/{content-id}/{member-id}")
    public ResponseEntity getContent(@Positive @PathVariable("content-id") Long contentId,
                                      @Positive @PathVariable("member-id") Long memberId){
        return new ResponseEntity<>(contentService.contentResponse(contentId, memberId), HttpStatus.OK);
    }
 */
    @GetMapping("/{content-id}")
    public ResponseEntity getContent(@Positive @PathVariable("content-id") Long contentId,
                                     HttpServletRequest request){
        return new ResponseEntity<>(contentService.contentResponse(contentId, request), HttpStatus.OK);
    }
/*
    @JsonIgnore
    @GetMapping("/{member-id}/likes")
    public ResponseEntity getLikes(
            @Positive @PathVariable("member-id") Long memberId,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "5", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        //List<Content> contents = contentService.getLikes(memberId);
        //Page<Content> contentsPage = contentService.contentPagination(contents, page-1, size, criteria, sort);
        Page<Content> contentsPage = contentService.contentPagination(contentService.getLikes(memberId), page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentService.contentsResponse(contentsPage,memberId), contentsPage), HttpStatus.OK);
    }

    @GetMapping("/{member-id}/likes/{theme-id}")
    public ResponseEntity getLikesTheme(
            @Positive @PathVariable("theme-id") Long themeId,
            @Positive @PathVariable("member-id") Long memberId,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "5", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        List<Content> contents = contentService.getLikes(memberId)
                .stream().filter(content -> (content.getTheme().getThemeId()) == themeId)
                .collect(Collectors.toList());
        Page<Content> contentsPage = contentService.contentPagination(contents, page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentService.contentsResponse(contentsPage,memberId), contentsPage), HttpStatus.OK);
    }
    */
    @JsonIgnore
    @GetMapping("/likes")
    public ResponseEntity getLikes(
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "5", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        //Long memberId = Long.parseLong(request.getHeader("memberId"));
        Long memberId = (Long) request.getAttribute("memberId");

        //memberId exception 처리
        Page<Content> contentsPage = contentService.contentPagination(contentService.getLikes(memberId), page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentService.contentsResponse(contentsPage,request), contentsPage), HttpStatus.OK);
    }

    @GetMapping("/likes/{theme-id}")
    public ResponseEntity getLikesTheme(
            @Positive @PathVariable("theme-id") Long themeId,
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "5", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        //Long memberId = Long.parseLong(request.getHeader("memberId"));
        Long memberId = (Long) request.getAttribute("memberId");

        //memberId exception 처리
        List<Content> contents = contentService.getLikes(memberId)
                .stream().filter(content -> (content.getTheme().getThemeId()) == themeId)
                .collect(Collectors.toList());
        Page<Content> contentsPage = contentService.contentPagination(contents, page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentService.contentsResponse(contentsPage,request), contentsPage), HttpStatus.OK);
    }

}


