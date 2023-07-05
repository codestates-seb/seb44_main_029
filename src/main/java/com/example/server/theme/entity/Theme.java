package com.example.server.theme.entity;


import com.example.server.music.entity.Music;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long themeId;

    private String title;

    @OneToMany(mappedBy = "theme")
    private List<Music> music;


}
