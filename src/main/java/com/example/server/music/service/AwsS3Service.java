package com.example.server.music.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.example.server.music.controller.MusicController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsResponse;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 메타데이터를 통해 파일을 업로드 하고 업로드된 파일의 uri를 생성합니다.(보류)
 *
 * s3에 저장된 mp3 파일의 uri를 클라이언트에게 전달하는 service
 * */
@Service
public class AwsS3Service {
    private final S3Client s3Client;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public AwsS3Service(S3Client s3Client) {
    this.s3Client = s3Client;
    }

    // 음원 url 하나만 가져오는 경우
    public String getMP3FileUrl(String fileName) {
        try {
            GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            return s3Client.utilities().getUrl(getUrlRequest).toExternalForm();
        } catch (SdkException e) {
            // S3 오류 처리
            throw new RuntimeException("Failed to retrieve MP3 file URL from S3: " + e.getMessage(), e);
        }
    }

    // 음원 url list 가져오는 경우
    public List<String> getMp3FileListUrl(long themeId){
        try{
            List<String> musicList = new ArrayList<>(); // url
            // 테마별 mp3 prefix 생성
            String themePrefix = themeId + "-";
            //s3에서 prefix로 시작하는 파일 가져온다.
            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                    .bucket(bucketName)
                    .prefix(themePrefix)
                    .build();

            ListObjectsResponse listObjectsResponse = s3Client.listObjects(listObjectsRequest);
            //url 값들을 리스트에 추가
            for(S3Object s3Object : listObjectsResponse.contents()){
                GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                        .bucket(bucketName)
                        .key(s3Object.key())
                        .build();
                String url = s3Client.utilities().getUrl(getUrlRequest).toExternalForm();
                musicList.add(url);
            }
            return musicList;
        } catch (SdkException e){
            throw new RuntimeException("list 반환에 실패: " + e.getMessage(), e);
        }
    }

//    // 음원 다운로드
//    public ResponseEntity<byte[]> downloadMusic(String s3Filename) throws IOException{
//
//    }
}
