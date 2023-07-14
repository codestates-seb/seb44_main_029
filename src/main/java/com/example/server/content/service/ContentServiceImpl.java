package com.example.server.content.service;

import com.example.server.content.controller.ContentController;
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
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsResponse;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
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
    private static final Logger logger = (Logger) LoggerFactory.getLogger(ContentController.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Value("${cloud.aws.region.static}")
    private String region;

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

    @Override
    // content url 가져오기
    public String getContentFileUrl(String fileName) {
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

    @Override
    public List<Content> getContentByTheme(Long themeId) {
        // 없으면 에러 추가
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new IllegalArgumentException("theme doesn't exist"));
        List<Content> contents = contentRepository.findByTheme(theme);
        for (Content content:contents){
            if (content.getUri() == null){
                content.setUri(getContentUrl(content.getTheme().getThemeId(), content.getContentId()));
            }
        }

        return contents;
    }

    @Override
    public List<Content> getLikes(Long memberId) {
        Member member = memberJpaRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("theme doesn't exist"));
        List<Content> contents = member.getLikes().stream()
                .map(Likes::getContent)
                .collect(Collectors.toList());
        for (Content content:contents){
            if (content.getUri() == null){
                content.setUri(getContentUrl(content.getContentId(), content.getTheme().getThemeId()));
                contentRepository.save(content);
            }
        }

        return contents;
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
    public List<ContentResponseDto> contentsResponse(List<Content> contents, Long memberId){

        return contents.stream()
                .map(Content -> {
                    ContentResponseDto contentResponseDto = contentMapper.ContentToContentResponseDto(Content);
                    if (likeRepository.findByMemberAndContent(memberJpaRepository.findById(memberId).orElseThrow(), Content).isPresent()){
                        contentResponseDto.setLiked(true);
                    };
                    return contentResponseDto;
                }).collect(Collectors.toList());
    }
}
