package com.example.server.theme.controller;

import com.example.server.theme.dto.ThemePostDto;
import com.example.server.theme.entity.Theme;
import com.example.server.theme.mapper.ThemeMapper;
import com.example.server.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/themes")
@Validated
@Slf4j
public class ThemeController {
    public final ThemeRepository themeRepository;
    public final ThemeMapper themeMapper;

    @GetMapping
    public ResponseEntity getThemes(){

        List<Theme> themes = themeRepository.findAll();

        return ResponseEntity.ok(themeMapper.ThemesToThemeResponseDtos(themes));
    }

    @PostMapping
    public void postTheme(@RequestBody ThemePostDto themePostDto){

        themeRepository.save(themeMapper.ThemePostDtoToTheme(themePostDto));
    }
}
