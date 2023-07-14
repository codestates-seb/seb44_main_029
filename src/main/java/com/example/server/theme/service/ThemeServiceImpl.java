package com.example.server.theme.service;

import com.example.server.theme.entity.Theme;
import com.example.server.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class ThemeServiceImpl implements ThemeService{
    public final ThemeRepository themeRepository;

    @Override
    public List<Theme> getThemes() {
        return themeRepository.findAll();
    }
}
