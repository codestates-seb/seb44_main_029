package com.example.server.member.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Member_Record")
@EntityListeners(AuditingEntityListener.class)
public class MemberRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Boolean active;

    @CreatedBy
    Long createdBy;

    @Email
    String email;

    String username;

    String imageUrl;

    @Enumerated(EnumType.STRING)
    Member.Role role;

    LocalDateTime createAt;

    @CreatedDate
    LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    Member member;

    @Getter
    public enum Role{
        USER("ROLE_USER"),
        ADMIN("ROLE_ADMIN");

        String key;
        Role(String key) {
            this.key = key;
        }
    }
}
