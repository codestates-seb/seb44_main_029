package com.example.server.content.service;

import com.example.server.content.controller.ContentController;
import com.example.server.content.dto.ContentListDto;
import com.example.server.content.dto.ContentPageDto;
import com.example.server.content.dto.ContentResponseDto;
import com.example.server.content.entity.Content;
import com.example.server.content.mapper.ContentMapper;
import com.example.server.content.repository.ContentRepository;
import com.example.server.likes.entity.Likes;
import com.example.server.likes.repository.LikeRepository;
import com.example.server.member.entity.Member;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.theme.entity.Theme;
import com.example.server.theme.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class ContentServiceImpl implements ContentService {
    private final ThemeRepository themeRepository;
    private final ContentRepository contentRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final LikeRepository likeRepository;
    private final ContentMapper contentMapper;
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;
    private static final Logger logger = (Logger) LoggerFactory.getLogger(ContentController.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
/*
    @Override
    public String getContentFileUrl(String title) {
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(title)
                    .build();

            PresignedGetObjectRequest presignedGetObjectRequest =
                    s3Presigner.presignGetObject(GetObjectPresignRequest.builder()
                                    .signatureDuration(Duration.ofMinutes(1))
                                    .build());
            String theUrl = presignedGetObjectRequest.url().toString();

            return s3Client.utilities().getUrl(getUrlRequest).toExternalForm();
        } catch (SdkException e) {
            throw new RuntimeException("파일 검색 실패: " + e.getMessage(), e);
        }
    }

    @Override
    public String getContentUrl(long themeId, long contentId){
        try {
            logger.info("getContentUrl 호출됨");
            String contentFileName = themeId + "-" + contentId + ".jpg";
            return getContentFileUrl(contentFileName);
        }catch(Exception e){
            return "url 반환에 실패했습니다: ";
        }
    }
*/
    @Override
    public List<Content> getContentByTheme(Long themeId) {
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new IllegalArgumentException("THEME doesn't exist"));

        return contentRepository.findByTheme(theme);
    }

    @Override
    public Page<Content> contentPagination(List<Content> contents, int page, int size, String criteria, String sort) {
        Pageable pageRequest = (sort.equals("ASC")) ?
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, criteria))
                : PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, criteria));

        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), contents.size());

        List<Content> pageContent = contents.subList(start, end);
        return new PageImpl<>(pageContent, pageRequest, contents.size());
    }

    @Override
    public ContentListDto contentResponse(Long contentId, HttpServletRequest request){
        Content content = contentRepository.findById(contentId).orElseThrow();
        Long themeId = content.getTheme().getThemeId();

        ContentResponseDto contentResponseDto = contentMapper.ContentToContentResponseDto(content);

        Long memberId = (Long) request.getAttribute("memberId");
        if (memberId == null){
            contentResponseDto.setLiked(false);
        } else {
            contentResponseDto.setLiked(likeRepository.findByMemberAndContent(memberJpaRepository.findById(memberId).orElseThrow(), content).isPresent());
        }

        List<Long> contentIdList = contentRepository.findByTheme(themeRepository.findById(themeId).orElseThrow()).stream()
                .map(Content::getContentId)
                .collect(Collectors.toList());

        //contentResponseDto.setContentUri(getContentFileUrl(content.getTitle()));

        return new ContentListDto(contentResponseDto, contentIdList);
    }

    @Override
    public List<ContentResponseDto> contentsResponse(Page<Content> contents, Long memberId){
        if (memberId == null) {
            return contents.getContent().stream()
                    .map(Content -> {
                        ContentResponseDto contentResponseDto = contentMapper.ContentToContentResponseDto(Content);
                        contentResponseDto.setLiked(false);
                        //contentResponseDto.setContentUri();
                        return contentResponseDto;
                    }).collect(Collectors.toList());
        } else {
            return contents.getContent().stream()
                    .map(Content -> {
                        ContentResponseDto contentResponseDto = contentMapper.ContentToContentResponseDto(Content);
                        contentResponseDto.setLiked(likeRepository.findByMemberAndContent(memberJpaRepository.findById(memberId).orElseThrow(), Content).isPresent());
                        //contentResponseDto.setContentUri();
                        return contentResponseDto;
                    }).collect(Collectors.toList());
        }

    }

    @Override
    public List<Content> getLikes( Long memberId) {

        Member member = memberJpaRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member doesn't exist"));

        return member.getLikes().stream()
                .map(Likes::getContent)
                .collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> likeResponse(
            HttpServletRequest request, int page, int size, String criteria, String sort){
        Long memberId = (Long) request.getAttribute("memberId");
        if (memberId == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.FORBIDDEN);
        }

        Page<Content> contentsPage = contentPagination(getLikes(memberId), page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentsResponse(contentsPage, memberId), contentsPage), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> likeThemeResponse(
            Long themeId, HttpServletRequest request, int page, int size, String criteria, String sort){
        Long memberId = (Long) request.getAttribute("memberId");
        if (memberId == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.FORBIDDEN);
        }

        List<Content> contents = getLikes(memberId)
                .stream().filter(content -> (content.getTheme().getThemeId()) == themeId)
                .collect(Collectors.toList());
        Page<Content> contentsPage = contentPagination(contents, page-1, size, criteria, sort);

        return new ResponseEntity<>(new ContentPageDto<>(contentsResponse(contentsPage, memberId), contentsPage), HttpStatus.OK);
    }


    // Content url 조회 - 메타데이터 기반 - Pre signed-url 적용 - 만료시간 1분
    public String getContentFileUrl(Long contentId){
        try{
            String url = null;
            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                    .bucket(bucketName)
                    .build();

            ListObjectsResponse listObjectsResponse = s3Client.listObjects(listObjectsRequest);
            for(S3Object s3Object : listObjectsResponse.contents()) {
                HeadObjectRequest headObjectRequest = HeadObjectRequest.builder() // 메타데이터 객체 요청
                        .bucket(bucketName)
                        .key(s3Object.key())
                        .build();

                HeadObjectResponse headObjectResponse = s3Client.headObject(headObjectRequest);
                Map<String, String> metadata = headObjectResponse.metadata();
                String contentIdMetadata = metadata.get("contentId");

                // 메타데이터가 일치하는 값을 반환
                if (contentIdMetadata != null && contentIdMetadata.equals(String.valueOf(contentId))) {
                    GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                            .bucket(bucketName)
                            .key(s3Object.key())
                            .build();

                    // pre-signed 객체 요청
                    GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                            .signatureDuration(Duration.ofMinutes(1)) // 만료시간
                            .getObjectRequest(getObjectRequest)
                            .build();

                    PresignedGetObjectRequest presignedGetObjectRequest = s3Presigner.presignGetObject(getObjectPresignRequest);
                    url = presignedGetObjectRequest.url().toString();
                    break;
                }
            }

            return url;
        } catch (SdkException e){
            throw new RuntimeException("URL 반환 실패: " + e.getMessage(), e);
        }
    }

    // 이미지 업로드 기능 - 관리자 권한필요 - 메타데이터 기반 업로드
    public void upload(MultipartFile file, Long contentId)  {
        String fileName = file.getOriginalFilename();
        try {

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .metadata(Collections.singletonMap("contentId", String.valueOf(contentId)))
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes())); // 바이트 배열로 전달
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
