package com.example.server.likes.service;

import org.springframework.stereotype.Service;

@Service
public interface LikesService {
    /*
    void likeContent(Long contentId, Long memberId);

    void unlikeContent(Long contentId, Long memberId);
*/
    void patchLike(Long contentId, Long memberId);
}
