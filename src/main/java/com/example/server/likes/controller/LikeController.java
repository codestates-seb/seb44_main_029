package com.example.server.likes.controller;

import com.example.server.content.service.ContentServiceImpl;
import com.example.server.likes.service.LikesServiceImpl;
import com.example.server.member.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    @PatchMapping("/{content-id}")
    synchronized public ResponseEntity<?> patchlike(@Positive @PathVariable("content-id") Long contentId,
                                       HttpServletRequest request){

        return likesService.patchLike(contentId, request);
    }
}
