package com.example.server.content.controller;

import com.example.server.content.dto.ContentListDto;
import com.example.server.content.dto.ContentPageDto;
import com.example.server.content.dto.ContentResponseDto;
import com.example.server.content.mapper.ContentMapper;
import com.example.server.content.repository.ContentRepository;
import com.example.server.content.service.ContentServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;

@Tag(name = "Contents", description = "API about Contents")
@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
@Validated
@Slf4j
@Transactional
public class ContentController {
    public final ContentMapper contentMapper;
    public final ContentServiceImpl contentService;
    public final ContentRepository contentRepository;

    @Operation(summary = "Content 세부 내용",
            description = "Content ID를 받아서 해당 이미지와 좋아요 정보, 동일한 테마의 이미지 ID 리스트를 반환합니다." +
                    "로그인이 되어 있지 않은 경우 모든 좋아요 정보는 false로 반환됩니다." +
                    "해당 리스트의 Content 정보에서 제공하는 URI는 원본의 pre-signed URI입니다.")

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "응답 성공"),
            @ApiResponse(responseCode = "403", description = "토큰 불일치 혹은 만료")
    })
    @GetMapping("/{content-id}")
    public ResponseEntity<ContentListDto> getContent(@Positive @PathVariable("content-id") Long contentId,
                                                     HttpServletRequest request){
        return new ResponseEntity<>(contentService.contentResponse(contentId, request), HttpStatus.OK);
    }

    @JsonIgnore
    @Operation(summary = "Like 리스트 반환",
            description = "사용자가 Like 표시한 Contents를 리스트의 형태로 Page 정보와 함께 반환합니다." +
                    "해당 리스트의 Content 정보에서 제공하는 URI는 thumbnail의 URI입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "응답 성공"),
            @ApiResponse(responseCode = "403", description = "토큰 불일치 혹은 만료")
    })
    @GetMapping("/likes")
    public ResponseEntity<?> getLikes(
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "8", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        return contentService.likeResponse(request, page, size, criteria, sort);
    }
    @Operation(summary = "테마 별 Like 리스트 반환",
            description = "사용자가 Like 표시한, Theme ID에 해당하는 Contents를 리스트의 형태로 Page 정보와 함께 반환합니다. \r \n \r\n" +
                    "해당 리스트의 Content 정보에서 제공하는 URI는 thumbnail의 URI입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "응답 성공"),
            @ApiResponse(responseCode = "403", description = "토큰 불일치 혹은 만료")
    })
    @GetMapping("/likes/{theme-id}")
    public ResponseEntity<?> getLikesTheme(
            @Positive @PathVariable("theme-id") Long themeId,
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "8", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        return contentService.likeThemeResponse(themeId, request, page, size, criteria, sort);
    }
}


