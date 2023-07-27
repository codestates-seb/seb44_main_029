package com.example.server.member.repository;

import com.example.server.member.entity.Member;
import com.example.server.member.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberJpaRepository extends JpaRepository<Member, Long> {
    @Query("select m from Member m where m.email = :email")
    Optional<Member> findByMemberEmail(String email);

    @Query("select m from Member m where m.username = :username")
    Optional<Member> findByMemberUsername(String username);
}