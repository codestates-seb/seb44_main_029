package com.example.server.content.entity;

import com.example.server.like.entity.Like;
import com.example.server.theme.entity.Theme;

import javax.persistence.*;
import java.util.List;



@Entity(name = "content")
public class Content {
    @Id
    private long contentId;

    private String title;

    private String uri;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @OneToMany(mappedBy = "content")
    private List<Like> likes;

    // enum으로 music,video(image) 구분 -> 검색 어떻게 하는지 봐야함
    public enum mediaType{
    }

    // private File thumbnail; 서버 파일 정보에 추가를 하는 편이 좋다고 생각함.
    //
}
