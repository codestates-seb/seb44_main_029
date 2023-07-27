package com.example.server.theme.controller;

import com.example.server.content.mapper.ContentMapper;
import com.example.server.content.service.ContentServiceImpl;
import com.example.server.theme.mapper.ThemeMapper;
import com.example.server.theme.service.ThemeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Tag(name = "Contents", description = "API about Contents")
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

    @Operation(summary = "Theme 이미지 리스트",
            description = "Theme ID를 받아서 해당 Theme의 Contents를 리스트의 형태로 Page 정보와 함께 반환합니다." +
                    "로그인이 되어 있지 않은 경우 모든 좋아요 정보는 false로 반환됩니다." +
                    "해당 리스트의 Content 정보에서 제공하는 URI는 thumbnail의 URI입니다.")

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "응답 성공"),
            @ApiResponse(responseCode = "403", description = "토큰 불일치 혹은 만료")
    })
    @GetMapping("/{theme_id}")
    public ResponseEntity<?> getContentByTheme(
            @Valid @PathVariable("theme_id") Long themeId,
            HttpServletRequest request,
            @Positive @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @Positive @RequestParam(required = false, defaultValue = "8", value = "size") int size,
            @RequestParam(required = false, defaultValue = "contentId", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "DESC", value = "sort") String sort){

        return themeService.themeResponse(themeId, request, page, size, criteria, sort);
    }
/*
    @GetMapping
    public ResponseEntity<?> getThemes(){

        return new ResponseEntity<>(themeMapper.ThemesToThemeResponseDtos(themeService.getThemes()), HttpStatus.OK);
    }
 */
}
