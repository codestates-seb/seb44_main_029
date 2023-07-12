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
import software.amazon.awssdk.services.s3.S3Client;

import java.io.IOException;

@RestController
@RequestMapping("/musicUpload")
@Slf4j
public class MusicUploadController {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AwsS3Service awsS3Service;
    private final S3Client s3Client;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    public MusicUploadController(AwsS3Service awsS3Service,
                           S3Client s3Client){
        this.awsS3Service = awsS3Service;
        this.s3Client = s3Client;
    }


    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file uploaded");
        }
        try {
            awsS3Service.upload(file);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }

    }



}
