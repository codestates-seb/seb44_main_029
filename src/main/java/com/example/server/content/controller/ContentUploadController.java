package com.example.server.content.controller;

import com.example.server.content.entity.Content;
import com.example.server.content.repository.ContentRepository;
import com.example.server.content.service.ContentServiceImpl;
import com.example.server.music.controller.MusicController;
import com.example.server.music.service.AwsS3Service;
import com.example.server.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contentsUpload")
@Slf4j
public class ContentUploadController {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AwsS3Service awsS3Service;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);
    private final ContentRepository contentRepository;
    private final ThemeRepository themeRepository;
    private final ContentServiceImpl contentService;

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title,
                                             @RequestParam("themeId") long themeId) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 존재하지 않습니다");
        }
        try {
            Content content = Content.builder()
                    .theme(themeRepository.findById(themeId).orElseThrow())
                    .title(title)
                    .build();
            contentRepository.save(content);
            contentService.upload(file, content.getContentId());
            return ResponseEntity.ok("이미지가 성공적으로 업로드 되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 실패: {}" + e.getMessage());
        }
    }
}
