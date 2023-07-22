package com.example.server.member.controller;

import com.example.server.member.dto.MemberUpdateDto;
import com.example.server.member.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admins")
@Tag(name = "AdminController", description = "API about Admin")
public class AdminController {
    private final MemberService memberService;
    @PatchMapping("/{member-id}")
    public ResponseEntity update(@PathVariable("member-id") Long memberId,
                                 @RequestBody MemberUpdateDto dto){
        Long response = memberService.update(dto, memberId);

        if(response < 1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
