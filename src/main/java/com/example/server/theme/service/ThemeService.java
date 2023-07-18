package com.example.server.theme.service;

import com.example.server.theme.entity.Theme;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ThemeService {
    List<Theme> getThemes();
}
