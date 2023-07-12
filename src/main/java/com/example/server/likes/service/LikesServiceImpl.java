package com.example.server.likes.service;

import com.example.server.content.entity.Content;
import com.example.server.content.repository.ContentRepository;
import com.example.server.likes.entity.Likes;
import com.example.server.likes.repository.LikeRepository;
import com.example.server.member.entity.Member;
import com.example.server.member.repository.MemberJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class LikesServiceImpl implements LikesService{
    public final ContentRepository contentRepository;
    public final LikeRepository likeRepository;
    public final MemberJpaRepository memberJpaRepository;

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

        Likes likes = likeRepository.findByMemberAndContent(member, content).orElseThrow();

        content.deleteLike(likes);
        member.deleteLike(likes);
        likeRepository.delete(likes);
    }
}
