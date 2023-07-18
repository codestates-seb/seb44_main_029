package com.example.server.likes.entity;

import com.example.server.content.entity.Content;
import com.example.server.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long likeId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    public Member member;

    @ManyToOne
    @JoinColumn(name = "content_id")
    public Content content;

    public void addMember(Member member){
        this.member = member;
        if (!this.member.getLikes().contains(this)){
            this.member.getLikes().add(this);
        }
    }

    public void addContent(Content content){
        this.content = content;
        if (!this.content.getLikes().contains(this)){
            this.content.getLikes().add(this);
        }
    }
}
