package com.example.server.member.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BlackList")
public class BlackList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String accessToken;
}
