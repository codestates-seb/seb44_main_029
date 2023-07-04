package com.example.server.theme.entity;

import com.example.server.content.entity.Content;

import javax.persistence.*;

@Entity
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long themeId;

    private String title;

    @OneToMany(mappedBy = "theme")
    private Content content;
}
