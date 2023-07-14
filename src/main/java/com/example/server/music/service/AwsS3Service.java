package com.example.server.music.service;


import com.example.server.music.controller.MusicController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.CompletedFileUpload;
import software.amazon.awssdk.transfer.s3.model.FileUpload;
import software.amazon.awssdk.transfer.s3.model.UploadFileRequest;
import software.amazon.awssdk.transfer.s3.progress.LoggingTransferListener;


import java.io.IOException;

import java.util.*;


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

    @Value("${cloud.aws.region.static}")
    private String region;


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
            throw new RuntimeException("파일 검색 실패: " + e.getMessage(), e);
        }
    }

//    public List<String> getMp3FileListUrl(long themeId){
//        try{
//            List<String> musicList = new ArrayList<>(); // url
//            // 테마별 mp3 prefix 생성
//            String themePrefix = themeId + "-";
//            //s3에서 prefix로 시작하는 파일을 가져오는 객체 생성.
//            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
//                    .bucket(bucketName)
//                    .prefix(themePrefix)
//                    .build();
//
//            ListObjectsResponse listObjectsResponse = s3Client.listObjects(listObjectsRequest);
//            //url 값들을 리스트에 추가
//            for(S3Object s3Object : listObjectsResponse.contents()){
//                GetUrlRequest getUrlRequest = GetUrlRequest.builder()
//                        .bucket(bucketName)
//                        .key(s3Object.key())
//                        .build();
//                String url = s3Client.utilities().getUrl(getUrlRequest).toExternalForm();
//                musicList.add(url);
//            }
//
//            return musicList;
//        } catch (SdkException e){
//            throw new RuntimeException("list 반환 실패: " + e.getMessage(), e);
//        }
//    }



    // 음원 url 조회 - 메타데이터 기반
    public List<String> getMp3FileListUrl(long themeId){
        try{
            List<String> musicList = new ArrayList<>(); // url
            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                    .bucket(bucketName)
                    .build();

            ListObjectsResponse listObjectsResponse = s3Client.listObjects(listObjectsRequest);
            for(S3Object s3Object : listObjectsResponse.contents()) {
                HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                        .bucket(bucketName)
                        .key(s3Object.key())
                        .build();

                HeadObjectResponse headObjectResponse = s3Client.headObject(headObjectRequest);
                Map<String, String> metadata = headObjectResponse.metadata();
                String themeIdMetadata = metadata.get("themeid");
                // 메타데이터가 일치하는 값 들만 url 값들을 리스트에 추가
                if (themeIdMetadata != null && themeIdMetadata.equals(String.valueOf(themeId))) {
                    GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                            .bucket(bucketName)
                            .key(s3Object.key())
                            .build();
                    String url = s3Client.utilities().getUrl(getUrlRequest).toExternalForm();
                    musicList.add(url);
                }
            }
            return musicList;
        } catch (SdkException e){
            throw new RuntimeException("list 반환 실패: " + e.getMessage(), e);
        }
    }

    // 음원 업로드 기능 - 관리자 권한필요 - 메타데이터 기반 업로드
    public void upload(MultipartFile file, long themeId)  {
        String fileName = file.getOriginalFilename();
        try {

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .metadata(Collections.singletonMap("themeId", String.valueOf(themeId)))
                    .build();
            logger.info("putObjectRequest: {}", putObjectRequest);
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private String generateFileName(String originalFilename) {
        String uniqueId = UUID.randomUUID().toString();
        String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
        return uniqueId + extension;
    }
}
