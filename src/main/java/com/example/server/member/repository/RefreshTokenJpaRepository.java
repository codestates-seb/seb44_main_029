package com.example.server.member.repository;

import com.example.server.member.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenJpaRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    @Query("select t from RefreshToken t where t.member.id = :memberId")
    Optional<RefreshToken> findByMemberId(Long memberId);

    @Query("delete from RefreshToken t where t.token = :token")
    void deleteByToken(String token);
}
