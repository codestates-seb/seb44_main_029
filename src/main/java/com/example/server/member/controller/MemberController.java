package com.example.server.member.controller;

import com.example.server.member.dto.MemberLoginDto;
import com.example.server.member.dto.MemberResponseDto;
import com.example.server.member.dto.MemberSignUpDto;
import com.example.server.member.dto.MemberUpdateDto;
import com.example.server.member.entity.Member;
import com.example.server.member.mapper.MemberMapper;
import com.example.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody MemberLoginDto dto){
        String token = memberService.login(dto);

        return new ResponseEntity(token, HttpStatus.OK);
    }
    @PostMapping("")
    ResponseEntity signUp(@RequestBody MemberSignUpDto dto){
        Long response = memberService.signUp(dto);

        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}")
    ResponseEntity read(@PathVariable("member-id") Long memberId){
        Member response = memberService.read(memberId);
        MemberResponseDto responseDto = memberMapper.MemberToMemberResponseDto(response);
        responseDto.setHowManyLiked(response.getLikes().size());

        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    ResponseEntity update(@RequestBody MemberUpdateDto dto, @PathVariable("member-id") Long memberId){
        Long response = memberService.update(dto, memberId);

        if(response == -1) return new ResponseEntity(response, HttpStatus.ACCEPTED);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    ResponseEntity delete(@PathVariable("member-id") Long memberId){
        memberService.delete(memberId);

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
    /*
    @PatchMapping("/{member-id}/{likes}")
    ResponseEntity updateLike(@PathVariable("member-id") Long memberId, @PathVariable("likes") String likes ){

    }
     */
}
