package com.example.server.content.controller;

import com.example.server.content.entity.Content;
import com.example.server.content.repository.ContentRepository;
import com.example.server.content.service.ContentServiceImpl;
import com.example.server.music.controller.MusicController;
import com.example.server.music.service.AwsS3Service;
import com.example.server.theme.repository.ThemeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

@Tag(name = "Contents", description = "API about Contents")
@RestController
@RequiredArgsConstructor
@RequestMapping("/contentsUpload")
@Slf4j
public class ContentUploadController {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);
    private final ContentRepository contentRepository;
    private final ThemeRepository themeRepository;
    private final ContentServiceImpl contentService;

    @Operation(summary = "파일 업로드",
            description = "파일을 Title과 Theme ID를 정하여 업로드합니다." +
                    "파일은 원본과 Thumbnail로 나뉘어서 업로드됩니다.")

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "업로드 성공"),
            @ApiResponse(responseCode = "500", description = "업로드 실패")
    })
    @Transactional
    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title,
                                             @RequestParam("themeId") long themeId) {

        return contentService.uploadSequence(file, title, themeId);
    }
/*
    @PatchMapping
    public ResponseEntity<String> thumbnailUploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title,
                                             @RequestParam("themeId") long themeId) {

        return contentService.uploadSequence(file, title, themeId);
    }
 */
}
