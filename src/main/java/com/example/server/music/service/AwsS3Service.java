package com.example.server.music.service;


import com.example.server.music.controller.MusicController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;


import java.io.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;


/**
 *
 * s3에 저장된 mp3 파일의 url을 클라이언트에게 전달하는 service
 * */
@Service
public class AwsS3Service {
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;
    private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Value("${cloud.aws.region.static}")
    private String region;


    public AwsS3Service(S3Client s3Client,
                        S3Presigner s3Presigner) {
        this.s3Client = s3Client;
        this.s3Presigner = s3Presigner;
    }


    // 음원 url 조회 v1 - 메타데이터 기반 조회
    public List<String> getMp3FileListUrlV1(long themeId){
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


    // 음원 조회v2  pre signed url 적용 - 만료시간 1분
    public List<String> getMp3FileListUrlV2(long themeId) {
        try {
            List<String> musicList = new ArrayList<>(); // url
            ListObjectsV2Request listObjectsRequest = ListObjectsV2Request.builder()
                    .bucket(bucketName)
                    .build();

            ListObjectsV2Response listObjectsResponse = s3Client.listObjectsV2(listObjectsRequest);
            List<String> objectKeys = listObjectsResponse.contents().stream()
                    .map(S3Object::key)
                    .collect(Collectors.toList());

            for (String key : objectKeys) {
                HeadObjectRequest headObjectRequest = HeadObjectRequest.builder() // 메타데이터 객체 요청
                        .bucket(bucketName)
                        .key(key)
                        .build();

                HeadObjectResponse headObjectResponse = s3Client.headObject(headObjectRequest);
                Map<String, String> metadata = headObjectResponse.metadata();
                String themeIdMetadata = metadata.get("themeid");

                // 메타데이터가 주어진 themeId와 일치하는 경우에만 Pre-signed URL 생성하여 리스트에 추가
                if (themeIdMetadata != null && themeIdMetadata.equals(String.valueOf(themeId))) {
                    GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build();

                    // pre-signed 객체 요청
                    GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                            .signatureDuration(Duration.ofMinutes(1)) // 만료시간
                            .getObjectRequest(getObjectRequest)
                            .build();

                    PresignedGetObjectRequest presignedGetObjectRequest = s3Presigner.presignGetObject(getObjectPresignRequest);
                    String theUrl = presignedGetObjectRequest.url().toString();

                    musicList.add(theUrl);
                }
            }

            return musicList;
        } catch (SdkException e) {
            throw new RuntimeException("list 반환 실패: " + e.getMessage(), e);
        }
    }

    //음원 조회v3 - pre-signed 비동기 처리
//    public List<String> getMp3FileListUrlV3(long themeId) {
//        try {
//            List<String> musicList = new ArrayList<>(); // 반환 url 리스트
//            // 개체 목록 요청
//            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
//                    .bucket(bucketName)
//                    .build();
//
//            // .listObjects()로 실제 s3client의 객체 목록 가져옴
//            ListObjectsResponse listObjectsResponse = s3Client.listObjects(listObjectsRequest);
//            // 스트림으로 객체 키 추출 - 데이터 병렬처리
//            List<String> objectKeys = listObjectsResponse.contents().stream()// 객체 목록 얻은 후 스트림 변환
//                    .map(S3Object::key)
//                    .collect(Collectors.toList()); // 결과를 리스트로 수집
//
//            // 비동기적으로 객체 정보 처리
//            List<CompletableFuture<String>> futures = objectKeys.stream()// 리스트 각 객체 키를 이용해서 CompletableFuture생성
//                    .map(key -> CompletableFuture.supplyAsync(() -> { // 비동기 작업을 생성, supplyAsync()
//                        // 객체의 메타 데이터를 가져옴
//                        HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
//                                .bucket(bucketName)
//                                .key(key)
//                                .build();
//
//                        HeadObjectResponse headObjectResponse = s3Client.headObject(headObjectRequest);
//                        Map<String, String> metadata = headObjectResponse.metadata();
//                        String themeIdMetadata = metadata.get("themeid");
//
//                        // 메타데이터가 주어진 themeId와 일치하는 경우에만 Pre-signed URL 생성하여 반환
//                        if (themeIdMetadata != null && themeIdMetadata.equals(String.valueOf(themeId))) {
//                            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
//                                    .bucket(bucketName)
//                                    .key(key)
//                                    .build();
//
//                            // pre-signed 객체 요청
//                            GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
//                                    .signatureDuration(Duration.ofMinutes(1)) // 만료시간
//                                    .getObjectRequest(getObjectRequest)
//                                    .build();
//
//                            PresignedGetObjectRequest presignedGetObjectRequest = s3Presigner.presignGetObject(getObjectPresignRequest);
//                            return presignedGetObjectRequest.url().toString();
//                        } else {
//                            return null; // url이 존재하지 않는다면 null 값을 넣어준다.
//                        }
//                    }))
//                    .collect(Collectors.toList());
//
//            // futures 리스트에 있는 모든 completablefuture들이 완료되기를 기다림.(allOf)
//            CompletableFuture<Void> allFutures = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
//            // 최종적으로 pre-signed url이 담긴 List<String>이 저장
//            CompletableFuture<List<String>> allUrlsFuture = allFutures.thenApply(v -> //allFutures는 실제 결과를 가지고있지 않다.
//                    futures.stream() //
//                            .map(CompletableFuture::join)
//                            .filter(Objects::nonNull)
//                            .collect(Collectors.toList()) // 필터링 후 실제 pre-signed url이 담긴 리스트 생성
//            );
//
//            musicList.addAll(allUrlsFuture.get());
//
//            return musicList;
//        } catch (Exception e) {
//            throw new RuntimeException("list 반환 실패: " + e.getMessage(), e);
//        }
//    }


    // 비동기 처리 업그레이드
    public List<String> getMp3FileListUrlV3(long themeId) {
        try {
            List<String> musicList = new ArrayList<>(); // 반환 url 리스트

            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                    .bucket(bucketName)
                    .build();

            ListObjectsResponse listObjectsResponse = s3Client.listObjects(listObjectsRequest);

            List<String> objectKeys = listObjectsResponse.contents().stream()
                    .map(S3Object::key)
                    .collect(Collectors.toList());

            List<String> urls = objectKeys.stream()
                    .map(key -> {
                        HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                                .bucket(bucketName)
                                .key(key)
                                .build();

                        HeadObjectResponse headObjectResponse = s3Client.headObject(headObjectRequest);
                        Map<String, String> metadata = headObjectResponse.metadata();
                        String themeIdMetadata = metadata.get("themeid");

                        if (themeIdMetadata != null && themeIdMetadata.equals(String.valueOf(themeId))) {
                            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                                    .bucket(bucketName)
                                    .key(key)
                                    .build();

                            GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                                    .signatureDuration(Duration.ofSeconds(10)) // Pre-signed URL의 유효기간을 조정
                                    .getObjectRequest(getObjectRequest)
                                    .build();

                            PresignedGetObjectRequest presignedGetObjectRequest = s3Presigner.presignGetObject(getObjectPresignRequest);
                            return presignedGetObjectRequest.url().toString();
                        } else {
                            return null;
                        }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            musicList.addAll(urls);
            return musicList;
        } catch (Exception e) {
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

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes())); // 바이트 배열로 전달
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    // 음원 다운로드 기능
    // 버킷에서 파일을 가져오고 그 내용을 byte[]로 변환하여 ResponseEntity로 반환
    public ResponseEntity<Void> download(String fileName) throws IOException{
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();
        // 파일의 내용을 가져옴
        ResponseInputStream<GetObjectResponse> getObjectResponse = s3Client.getObject(getObjectRequest);
        InputStream objectInputStream = getObjectResponse;

        String resultFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8).replaceAll("\\+", "%20");

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", resultFileName);

        // 로컬 다운로드 폴더 경로
        String downloadFolderPath = "C:\\Users\\Downloads"; // windows

        // 로컬 다운로드 폴더에 파일 저장
        String filePath = downloadFolderPath + File.separator + resultFileName;
        try (FileOutputStream fileOutputStream = new FileOutputStream(filePath)) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = objectInputStream.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, bytesRead);
            }
        }

        return new ResponseEntity<>(httpHeaders, HttpStatus.OK);

    }


}
