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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


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

    public List<String> getMp3FileListUrl(long themeId){
        try{
            List<String> musicList = new ArrayList<>(); // url
            // 테마별 mp3 prefix 생성
            String themePrefix = themeId + "-";
            //s3에서 prefix로 시작하는 파일을 가져오는 객체 생성.
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
            throw new RuntimeException("list 반환 실패: " + e.getMessage(), e);
        }
    }

    // 음원 업로드
//    public String upload(MultipartFile file) throws IOException {
//            String fileName = generateFileName(file.getOriginalFilename());
//
//            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(fileName)
//                    .build();
//
//            s3Client.putObject(putObjectRequest, (Path) file.getInputStream());
//
//
//            return "https://" + bucketName + "/" + fileName;
//        }
//
//    private String generateFileName(String originalFilename) {
//        String uniqueId = UUID.randomUUID().toString();
//        String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
//        return uniqueId + extension;
//    }

    //음원 업로드 v2
//    public void upload(String fileName, InputStream inputStream) throws S3Exception, IOException{
//        try {
//            RequestBody requestBody = RequestBody.fromInputStream(inputStream, -1);
//            PutObjectRequest request = PutObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(fileName)
//                    .build();
//
//            s3Client.putObject(request, requestBody);
//        } catch (SdkException e) {
//            throw new RuntimeException("파일 업로드 실패: " + e.getMessage(), e);
//        }
//    }

    // 음원 업로드 v3
//    public String uploadFile(MultipartFile file) {
//        try {
//            // S3에 파일 업로드
//            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(file.getOriginalFilename())
//                    .build();
//            byte[] fileBytes = file.getBytes();
//            RequestBody requestBody = RequestBody.fromBytes(fileBytes);
//            s3Client.putObject(putObjectRequest, requestBody);
//
//            return "File uploaded successfully!";
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "Failed to upload file.";
//        }
//    }
//    public String uploadFile(MultipartFile file, String bucketName) {
//
//        logger.info("service 1");
//        try {
//            //업로드할 파일 버켓 이름과 키 설정
//            String key = UUID.randomUUID().toString();
//            logger.info("service key");
//
//            File tempFile = File.createTempFile("temp", null);// MultipartFile을 임시 파일로 저장
//            file.transferTo(tempFile);
//
//            logger.info("service 2");
//            // 파일 업로드 요청 생성
//            UploadFileRequest uploadFileRequest = UploadFileRequest.builder()
//                    .putObjectRequest(b -> b.bucket(bucketName).key(key))
//                    .addTransferListener(LoggingTransferListener.create()) // 업로드 진행상황 로깅
//                    .source(tempFile.toPath()) // 파일 경로를 java.nio.file.Path 객체로 변환
//                    .build();
//            logger.info("service 3");
//            FileUpload fileUpload = transferManager.uploadFile(uploadFileRequest); // 파일 업로드 시작
//            CompletedFileUpload uploadResult = fileUpload.completionFuture().join();// 업로드 작업이 완료될 때 까지 대기, CompletedFileUpload 객체를 통해 업로드 완료 후의 상태와 결과 제공
//            String eTag = uploadResult.response().eTag(); // 업로드 결과의 ETag(entityTag) 값
//            logger.info("service 4");
//
//            // 임시 파일 삭제
//            tempFile.delete();
//            logger.info("service 5");
//
//            return eTag;
//        } catch (Exception e){
//            e.printStackTrace();
//            return null;
//        }
//    }



//    // 음원 다운로드
//    public ResponseEntity<byte[]> downloadMusic(String s3Filename) throws IOException{
//
//    }

    //음원 업로드 v4
//    public String uploadFile(MultipartFile file) throws IOException {
//        String key = UUID.randomUUID().toString();
//
//        UploadFileRequest uploadFileRequest = UploadFileRequest.builder()
//                .putObjectRequest(b -> b.bucket(bucketName).key(key))
//                .addTransferListener(LoggingTransferListener.create())
//                .source(file.getResource().getFile().toPath()) // 파일 경로를 가져오기 위해 Resource를 사용합니다.
//                .build();
//
//        FileUpload fileUpload = s3TransferManager.uploadFile(uploadFileRequest);
//        CompletedFileUpload uploadResult = fileUpload.completionFuture().join();
//        String eTag = uploadResult.response().eTag();
//        logger.info("File uploaded with ETag: {}", eTag);
//
//        return eTag;
//    }

    public void upload(MultipartFile file)  {
//        String fileName = generateFileName(file.getOriginalFilename());
        String fileName = file.getOriginalFilename();
        try {

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();
//uses RequestBody.fromFile to avoid loading the whole file into memory.
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
