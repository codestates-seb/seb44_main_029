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
    private int currentMusic = 0; // 이전, 다음 음원 구분
    private List<String> urlList = new ArrayList<>();// 조회 순서
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    public MusicController(AwsS3Service awsS3Service) {
        this.awsS3Service = awsS3Service;
    }


//    // s3에 저장된 mp3 파일의 url 가져오기 - 파일명으로 조회
//    @GetMapping("/{music-id}")
//    public ResponseEntity<String> getMusicUrl(@Positive @PathVariable("music-id")long musicId,
//                                              @Positive @PathVariable("theme-id")long themeId){
//        try {
//            logger.info("getMusicUrl 호출됨");
//            String mp3FileName = themeId + "-" + musicId + ".mp3";
//            String mp3FileUrl = awsS3Service.getMP3FileUrl(mp3FileName);
//            return ResponseEntity.ok(mp3FileUrl);
//        }catch(Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("url 반환에 실패했습니다: " + e.getMessage());
//        }
//    }

    // s3에 저장된 mp3 파일의 url list 가져오기
    @GetMapping("/list")
    public ResponseEntity getMusicUrlList(@Positive @PathVariable("theme-id") long themeId){
        try{
            List<String> mp3List = awsS3Service.getMp3FileListUrlV2(themeId);
            return ResponseEntity.ok(mp3List);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("url list 반환에 실패했습니다: " + e.getMessage());
        }
    }


    /**
     * 서버에서 음원 인덱스 구현을 통해 현재, 이전, 다음 음원 조회 기능 구현
     * url 만료 시간은 1분입니다.
     * 1. 현재 음원 조회
     * 2. 다음 음원 조회
     * 3. 이전 음원 조회
     * */
    // 현재음원 조회
    @GetMapping("/current")
    public ResponseEntity<String> getCurrentMusicUrl(@Positive @PathVariable("theme-id") long themeId){
        try{
            urlList = awsS3Service.getMp3FileListUrlV2(themeId);
            String current = urlList.get(currentMusic);
            return ResponseEntity.ok(current);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("url 반환에 실패했습니다: " + e.getMessage());
        }
    }

    // 이전음원 조회
    @GetMapping("/previous")
    public ResponseEntity<String> getPreviousMusicUrl(@Positive @PathVariable("theme-id") long themeId){
        try{
            urlList = awsS3Service.getMp3FileListUrlV2(themeId);
            if(currentMusic > 0 ){
                currentMusic--;
            }
            else{ // currentMusic == 0
                currentMusic = urlList.size()-1;// 리스트 마지막 인덱스 음원 출력
            }
            String previous = urlList.get(currentMusic);
            return ResponseEntity.ok(previous);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("url 반환에 실패했습니다: " + e.getMessage());
        }
    }

    // 다음음원 조회
    @GetMapping("/next")
    public ResponseEntity<String> getNextMusicUrl(@Positive @PathVariable("theme-id") long themeId){
        try{
            urlList = awsS3Service.getMp3FileListUrlV2(themeId);
            if(currentMusic >= 0 && currentMusic < urlList.size()-1){
                currentMusic++;
            }
            else { // currentMusic == urlList.size()-1
                currentMusic = 0;
            }
            String next = urlList.get(currentMusic);
            return ResponseEntity.ok(next);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("url 반환에 실패했습니다: " + e.getMessage());
        }
    }




}
