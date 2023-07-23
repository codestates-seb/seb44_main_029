package com.example.server.music.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


public class MusicDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto{
        private List<String> urlName;
    }


}
