package com.example.server.theme.repository;

import com.example.server.theme.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
    Optional<Theme> findByTitle(String themeTitle);

    List<Theme> findAll();
}
