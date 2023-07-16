package com.example.server.music.controller;

import com.example.server.music.service.AwsS3Service;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/musicUpload")
@Slf4j
public class MusicUploadController {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AwsS3Service awsS3Service;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    public MusicUploadController(AwsS3Service awsS3Service){
        this.awsS3Service = awsS3Service;
    }


    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("themeId") long themeId) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 존재하지 않습니다");
        }
        try {
            awsS3Service.upload(file, themeId);
            return ResponseEntity.ok("음원이 성공적으로 업로드 되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("음원 업로드 실패: {}" + e.getMessage());
        }

    }



}
