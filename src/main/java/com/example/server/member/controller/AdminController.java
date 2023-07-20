package com.example.server.member.controller;

import com.example.server.member.dto.MemberUpdateDto;
import com.example.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admins")
public class AdminController {
    private final MemberService memberService;

//    private final BCryptPasswordEncoder passwordEncoder;
//
//    @GetMapping("")
//    public String getPassword(){
//        return passwordEncoder.encode("adminpassword");
//    }
    @PatchMapping("/{member-id}")
    public ResponseEntity update(@PathVariable("member-id") Long memberId,
                                 @RequestBody MemberUpdateDto dto){
        Long response = memberService.update(dto, memberId);

        if(response < 1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
