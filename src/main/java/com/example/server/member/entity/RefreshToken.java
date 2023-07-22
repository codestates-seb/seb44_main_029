package com.example.server.member.entity;

import jdk.jfr.Timestamp;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(columnDefinition = "TINYINT(1)")
    Boolean active;
    String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;
}
