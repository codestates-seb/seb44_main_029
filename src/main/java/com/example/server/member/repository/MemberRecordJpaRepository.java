package com.example.server.member.repository;

import com.example.server.member.entity.MemberRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRecordJpaRepository extends JpaRepository<MemberRecord, Long> {
}
