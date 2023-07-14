package com.example.server.likes.controller;

import com.example.server.likes.service.LikesServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
@Validated
@Slf4j
public class LikeController {
    public final LikesServiceImpl likesService;

    @PostMapping("/{content-id}/{member-id}")
    public void setLike(@PathVariable("content-id") Long contentId,
                        @PathVariable("member-id") Long memberId){

        likesService.likeContent(contentId, memberId);
    }

    @DeleteMapping("/{content-id}/{member-id}")
    public void setUnlike(@PathVariable("content-id") Long contentId,
                          @PathVariable("member-id") Long memberId){

        likesService.unlikeContent(contentId, memberId);
    }

    @PatchMapping("/{content_id}/{member_id}")
    synchronized public void patchlike(@PathVariable("content_id") Long contentId,
                          @PathVariable("member_id") Long memberId){

        likesService.patchLike(contentId, memberId);
    }
}
