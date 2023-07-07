package com.example.server.theme.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/theme")
public class ThemeController {

    // 전체 테마 리스트 반환 > 저장된 테마들의 기본 이미지를 리스트 형태로 전달
    @GetMapping
    public ResponseEntity getThemes(){
        // 저장소에서 이미지 불러오는 로직 > 이걸 mysql로 진행하면 허웅님과
        // 겹칠 것 같아 resource 파일에서 가져오는 로직으로 변경.
        //
    return null;

    }


    // 해당 테마의 gif 이미지 반환 > 허웅님

}
