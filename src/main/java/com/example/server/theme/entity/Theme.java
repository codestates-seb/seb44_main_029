package com.example.server.theme.entity;

import com.example.server.content.entity.Content;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long themeId;

    private String title;

    @OneToMany(mappedBy = "theme")
    private List<Content> content;

//    @OneToMany(mappedBy = "theme")
//    private Music music;
}
