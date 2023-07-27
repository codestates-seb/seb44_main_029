package com.example.server.content.repository;

import com.example.server.content.entity.Content;
import com.example.server.theme.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByTheme(Theme theme);
}
