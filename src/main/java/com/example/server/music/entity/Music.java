package com.example.server.music.entity;

import com.example.server.theme.entity.Theme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long musicId;

    @Column
    private String musicFile;

    @Column
    private String title;

    @Column
    private double playtime;

    @ManyToOne
    @JoinColumn(name = "themeId")
    private Theme theme;

}
