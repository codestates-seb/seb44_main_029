package com.example.server.member.repository;

import com.example.server.member.entity.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlackListJpaRepository extends JpaRepository<BlackList, Long> {
    @Query("select b.accessToken from BlackList b where b.accessToken = :token")
    Optional<BlackList> findByToken(String token);
}
