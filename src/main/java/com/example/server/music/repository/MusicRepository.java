package com.example.server.music.repository;

import com.example.server.music.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
//    List<Music> findByThemeId(long themeId);
}
