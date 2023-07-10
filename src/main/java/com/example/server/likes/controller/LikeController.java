package com.example.server.likes.controller;

import com.example.server.content.entity.Content;
import com.example.server.content.repository.ContentRepository;
import com.example.server.likes.entity.Likes;
import com.example.server.likes.repository.LikeRepository;
import com.example.server.member.entity.Member;
import com.example.server.member.repository.MemberJpaRepository;
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

    public final ContentRepository contentRepository;
    public final LikeRepository likeRepository;
    public final MemberJpaRepository memberJpaRepository;

    // Member 정보 + Content id or title 뭐 아무거나 받아서
    // 두개 기반으로 Jpa 검색
    // 발견되면? 삭제, 발견 안 되면? 생성

    //@PatchMapping public void updateLike(){};
    // 확인용으로 ResponseDto 만들어보기 고려할 것

    @PatchMapping("/{content-id}/{member-id}")
    public void setLike(@PathVariable("content-id") Long contentId,
                        @PathVariable("member-id") Long memberId){

        Content content = contentRepository.findById(contentId).orElseThrow();
        Member member = memberJpaRepository.findById(memberId).orElseThrow();

        Likes likes = new Likes();
        likes.addMember(member);
        likes.addContent(content);
        likeRepository.save(likes);


        //contentRepository.save(content);
        //memberJpaRepository.save(member);
    }

    @DeleteMapping("/{content-id}/{member-id}")
    public void setUnlike(@PathVariable("content-id") Long contentId,
                          @PathVariable("member-id") Long memberId){

        Content content = contentRepository.findById(contentId).orElseThrow();
        Member member = memberJpaRepository.findById(memberId).orElseThrow();

        Likes likes = likeRepository.findByMemberAndContent(member, content).orElseThrow();

        content.deleteLike(likes);
        member.deleteLike(likes);

        likeRepository.delete(likes);
        contentRepository.save(content);
        memberJpaRepository.save(member);
    }
}
