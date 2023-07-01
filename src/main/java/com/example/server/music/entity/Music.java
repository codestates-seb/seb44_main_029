package com.example.server.music.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.ui.context.Theme;
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

//    @JoinColumn
//    private Theme theme;

//    public void setTheme(Theme theme) {
//        this.theme = theme;
//    }



}
