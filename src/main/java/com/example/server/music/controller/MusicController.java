package com.example.server.music.controller;


import com.example.server.music.repository.MusicRepository;
import com.example.server.music.service.AwsS3Service;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.S3Client;

import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

/**음악 조회 - 특정 테마에 해당하는 음원을 조회합니다.
 1. s3에 음원 파일 업로드하는 로직 > 전처리가 필요합니다. 데이터 압축 // 음원 업로드
 2. 클라이언트가 S3에 저장 된 음원의 URL 정보를 요청합니다.
 3. 서버를 RDS에서 해당 요청에 맞는 S3의 URL을 클라이언트에게 전달합니다.

 */
@RestController
@RequestMapping("/theme/{theme-id}/music")
@Slf4j
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MusicController {
    private final MusicRepository musicRepository;
    private final AwsS3Service awsS3Service;
    private final S3Client s3Client;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    public MusicController(MusicRepository musicRepository,
                           AwsS3Service awsS3Service,
                           S3Client s3Client) {
        this.musicRepository = musicRepository;
        this.awsS3Service = awsS3Service;
        this.s3Client = s3Client;
    }


    // s3에 저장된 mp3 파일의 url 가져오기
    @GetMapping("/{music-id}")
    public ResponseEntity<String> getMusicUrl(@Positive @PathVariable("music-id")long musicId,
                                              @Positive @PathVariable("theme-id")long themeId){
        try {
            logger.info("getMusicUrl 호출됨");
            String mp3FileName = themeId + "-" + musicId + ".mp3";
            String mp3FileUrl = awsS3Service.getMP3FileUrl(mp3FileName);
            return ResponseEntity.ok(mp3FileUrl);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("url 반환에 실패했습니다: " + e.getMessage());
        }
    }

    // s3에 저장된 mp3 파일의 url list 가져오기
    @GetMapping("/list")
    public ResponseEntity getMusicUrlList(@Positive @PathVariable("theme-id") long themeId){
        try{
            List<String> mp3List = awsS3Service.getMp3FileListUrl(themeId);
            return ResponseEntity.ok(mp3List);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("url list 반환에 실패했습니다: " + e.getMessage());
        }
    }



}
