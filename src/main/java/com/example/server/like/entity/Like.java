package com.example.server.like.entity;

import com.example.server.content.entity.Content;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class Like {
    // Member-Video mapping table
    @Id
    public long likeId;
/*
    @ManyToOne
    @JoinColumn(name = "member_id")
    public Member member;
*/
    @ManyToOne
    @JoinColumn(name = "content_id")
    public Content content;
}
