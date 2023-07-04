package com.example.server.content.controller;

import com.example.server.content.entity.Content;
import com.example.server.content.repository.ContentRepository;
import com.example.server.theme.entity.Theme;
import com.example.server.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/video")
@Validated
@Slf4j
public class ContentController {

    public ContentRepository contentRepository;

    public ThemeRepository themeRepository; //serv


    // theme로 content 찾기
    @GetMapping("/{theme_title}")
    public ResponseEntity getMediaByTheme(@PathVariable("theme_title") String themeTitle){
        // 테마 레포에서 입력받은 테마 이름으로 검색해서 테마 정보 긁어오기;
        // 없으면 에러 발생시키기;
        Theme theme = themeRepository.findByTitle(themeTitle); //serv

        // 테마값으로 Content 긁어오기;
        // enum을 통해서 music과 media 구분하기;
        List<Content> contents = contentRepository.findByTheme(theme); //serv


        // 긁어온 Videos를


        //

        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    // member, like한 content list 찾기

    // member, theme로 like한 content 찾기

    // patch / Like 설정 및 해제 -> Like controller 및 연관된 member, content에서 연동 해제


}
