package com.example.server.content.entity;

import com.example.server.likes.entity.Likes;
import com.example.server.theme.entity.Theme;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long contentId;

    private String title;

    private String uri;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Likes> likes;

    public void addLike(Likes likes){
        this.likes.add(likes);
        if(likes.getContent() != this){
            likes.addContent(this);
        }
    }

    public void deleteLike(Likes likes){
        this.likes.remove(likes);
    }

/*
    // enum으로 music,video(image) 구분 -> 일단 미고려
    public enum Media{
        MUSIC("MEDIA_MUSIC"),
        VIDEO("MEDIA_VIDEO");

        final String key;
        Media(String key) {
            this.key = key;
        }
    }
*/
    // private File thumbnail; 서버 파일 정보에 추가를 하는 편이 좋다고 생각함.
    //


}
