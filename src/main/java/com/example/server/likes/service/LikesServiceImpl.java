package com.example.server.likes.service;

import com.example.server.content.entity.Content;
import com.example.server.content.repository.ContentRepository;
import com.example.server.likes.entity.Likes;
import com.example.server.likes.repository.LikeRepository;
import com.example.server.member.entity.Member;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class LikesServiceImpl implements LikesService{
    public final ContentRepository contentRepository;
    public final LikeRepository likeRepository;
    public final MemberJpaRepository memberJpaRepository;
    public final MemberService memberService;
/*
    @Override
    public void likeContent(Long contentId, Long memberId) {
        Content content = contentRepository.findById(contentId).orElseThrow();
        Member member = memberJpaRepository.findById(memberId).orElseThrow();

        Likes likes = new Likes();
        likes.addMember(member);
        likes.addContent(content);
        likeRepository.save(likes);
    }

    @Override
    public void unlikeContent(Long contentId, Long memberId) {
        Content content = contentRepository.findById(contentId).orElseThrow();
        Member member = memberJpaRepository.findById(memberId).orElseThrow();

        Likes likes = likeRepository.findByMemberAndContent(member, content).orElseThrow(() -> new NullPointerException(""));

        content.deleteLike(likes);
        member.deleteLike(likes);
        likeRepository.delete(likes);
    }
*/
    @Override
    public ResponseEntity patchLike(Long contentId, Long memberId, HttpServletRequest request) {

        Content content = contentRepository.findById(contentId).orElseThrow();
        Member member = memberJpaRepository.findById(memberId).orElseThrow();

        Likes likes = likeRepository.findByMemberAndContent(member, content).orElse(null);

        if (likes == null){
            Likes newLikes = new Likes();
            newLikes.addMember(member);
            newLikes.addContent(content);
            likeRepository.save(newLikes);
        } else {
            content.deleteLike(likes);
            member.deleteLike(likes);
            likeRepository.delete(likes);
        };

        return new ResponseEntity("Successfully Liked/Unliked", HttpStatus.OK);
    }
}
