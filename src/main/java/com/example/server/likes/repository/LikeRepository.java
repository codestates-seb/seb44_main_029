package com.example.server.likes.repository;

import com.example.server.content.entity.Content;
import com.example.server.likes.entity.Likes;
import com.example.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByMemberAndContent(Member member, Content content);
}
