package com.example.server.content.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Schema(description = "Pagination Information")
public class PageInfo {


    @Schema(description = "Requested Page")
    private int page;

    @Schema(description = "Page Size")
    private int size;

    @Schema(description = "Total Number of Searched Elements")
    private long totalElements;

    @Schema(description = "Total Number of Pages")
    private int totalPages;
}
