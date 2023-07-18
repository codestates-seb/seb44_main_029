package com.example.server.likes.controller;

import com.example.server.content.service.ContentServiceImpl;
import com.example.server.likes.service.LikesServiceImpl;
import com.example.server.member.service.MemberService;
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
public class LikeController {
    public final LikesServiceImpl likesService;
    public final ContentServiceImpl contentService;
    public final MemberService memberService;
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
    synchronized public ResponseEntity patchlike(@Positive @PathVariable("content-id") Long contentId,
                                       @Positive @PathVariable("member-id") Long memberId,
                                       HttpServletRequest request){

        Long requestId = (Long) request.getAttribute("memberId");
        //Long requestId = Long.parseLong(request.getHeader("memberId"));
        if(!memberService.isRequesterSameOwner(requestId, memberId)){
            return new ResponseEntity("요청자와 자원소유자가 다릅니다.", HttpStatus.FORBIDDEN);}

        return likesService.patchLike(contentId, memberId, request);
    }
/*
    @GetMapping("/{content-id}/{member-id}")
    public ResponseEntity getLikedContent(@Positive @PathVariable("content-id") Long contentId,
                                          @Positive @PathVariable("member-id") Long memberId){
        return new ResponseEntity<>(contentService.likedContentResponse(contentId, memberId), HttpStatus.OK);
    }
 */
}
