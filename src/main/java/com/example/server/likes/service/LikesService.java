package com.example.server.likes.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public interface LikesService {
    /*
    void likeContent(Long contentId, Long memberId);

    void unlikeContent(Long contentId, Long memberId);
*/
    ResponseEntity patchLike(Long contentId, HttpServletRequest request);
}
