package com.example.server.theme.repository;

import com.example.server.theme.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
    Theme findByTitle(String themeTitle);
}
