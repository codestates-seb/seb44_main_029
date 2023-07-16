package com.example.server.likes.controller;

import com.example.server.likes.service.LikesServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
@Validated
@Slf4j
public class LikeController {
    public final LikesServiceImpl likesService;
/*
    @PostMapping("/{content-id}/{member-id}")
    public void setLike(@Positive @PathVariable("content-id") Long contentId,
                        @Positive @PathVariable("member-id") Long memberId){

        likesService.likeContent(contentId, memberId);
    }

    @DeleteMapping("/{content-id}/{member-id}")
    public void setUnlike(@Positive @PathVariable("content-id") Long contentId,
                          @Positive @PathVariable("member-id") Long memberId){

        likesService.unlikeContent(contentId, memberId);
    }
*/
    
    @PatchMapping("/{content-id}/{member-id}")
    synchronized public void patchlike(@Positive @PathVariable("content-id") Long contentId,
                                       @Positive @PathVariable("member-id") Long memberId){

        likesService.patchLike(contentId, memberId);
    }
}
