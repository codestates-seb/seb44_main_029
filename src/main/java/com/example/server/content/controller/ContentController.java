package com.example.server.content.controller;

import com.example.server.content.entity.Content;
import com.example.server.content.mapper.ContentMapper;
import com.example.server.content.repository.ContentRepository;
import com.example.server.likes.entity.Likes;
import com.example.server.member.entity.Member;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.theme.entity.Theme;
import com.example.server.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
@Validated
@Slf4j
public class ContentController {

    public final ContentRepository contentRepository;
    public final MemberJpaRepository memberJpaRepository;
    public final ThemeRepository themeRepository;
    public final ContentMapper contentMapper;

    /*
    public ResponseEntity getContents(){
        return new
    }
    */

    // theme로 content 찾기
    // Response에 포함되어야 하는 것 = 유저 정보 기반으로, like 표시가 되어 있는지 여부
    @GetMapping("/{theme_id}")
    public ResponseEntity getContentByTheme(@PathVariable("theme_id") Long themeId){
        // 없으면 에러 추가
        Theme theme = themeRepository.findById(themeId).orElseThrow(); //serv
        List<Content> contents = contentRepository.findByTheme(theme); //serv


        return new ResponseEntity<>(contents.stream()
                .map(contentMapper::ContentToContentResponseDto)
                .collect(Collectors.toList()), HttpStatus.CREATED);
    }

    // member, like한 content list 찾기
    @JsonIgnore
    @GetMapping("/{member-id}/likes")
    public ResponseEntity getLikes(@PathVariable("member-id") Long memberId){

        //Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //UserDetails userDetails = (UserDetails) principal;
        //String userName = userDetails.getUsername();

        Member member = memberJpaRepository.findById(memberId).orElseThrow();

        List<Content> contents = member.getLikes().stream()
                .map(Likes::getContent)
                .collect(Collectors.toList());

        return new ResponseEntity<>(contents.stream()
                .map(contentMapper::ContentToContentResponseDto)
                .collect(Collectors.toList()), HttpStatus.CREATED);
    }


    // member, theme로 like한 content 찾기
    // likes 기반으로 contents를 찾은 다음에, theme 속성 기준으로 분류해서 내놓는다.
    // likes 테스트 이후 구현할 것.
    @GetMapping("/{member_id}/likes/{theme_id}")
    public ResponseEntity getLikesTheme(@PathVariable("theme_id") String themeId,
                                        @PathVariable("member_id") String memberId){
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }
}
