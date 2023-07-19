package com.example.server.music.controller;


import com.example.server.music.service.AwsS3Service;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

/**음원 조회 - 특정 테마에 해당하는 음원을 조회합니다.
 * 1.
 */
@RestController
@RequestMapping("/theme/{theme-id}/music")
@Slf4j
public class MusicController {
    private final AwsS3Service awsS3Service;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    public MusicController(AwsS3Service awsS3Service) {
        this.awsS3Service = awsS3Service;
    }



    // s3에 저장된 mp3 파일의 url list 가져오기
    @GetMapping("/list")
    public ResponseEntity getMusicUrlList(@Positive @PathVariable("theme-id") long themeId){

        List<String> mp3List = awsS3Service.getMp3FileListUrlV2(themeId);
        return ResponseEntity.ok(mp3List);
    }



}
