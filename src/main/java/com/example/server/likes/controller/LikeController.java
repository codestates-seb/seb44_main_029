package com.example.server.likes.controller;

import com.example.server.content.service.ContentServiceImpl;
import com.example.server.likes.service.LikesServiceImpl;
import com.example.server.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
@Validated
@Slf4j
@Tag(name = "Like", description = "API about Like")
public class LikeController {
    public final LikesServiceImpl likesService;
    public final ContentServiceImpl contentService;
    public final MemberService memberService;

    @Operation(summary = "Like/Unlike 요청",
            description = "사용자가 특정 Content에 대해서 좋아요를 등록 또는 해제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "좋아요 등록/해제 성공"),
            @ApiResponse(responseCode = "403", description = "토큰 불일치 혹은 만료")
    })
    @Transactional
    @PatchMapping("/{content-id}")
    public ResponseEntity<?> patchlike(@Positive @PathVariable("content-id") Long contentId,
                                       HttpServletRequest request){

        return likesService.patchLike(contentId, request);
    }
}
