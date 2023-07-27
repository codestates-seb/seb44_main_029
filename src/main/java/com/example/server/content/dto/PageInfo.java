package com.example.server.content.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PageInfo {


    private int page;

    private int size;

    private long totalElements;

    private int totalPages;
}
