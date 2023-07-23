package com.example.server.member.security.token;

import com.example.server.member.entity.Member;
import com.example.server.member.repository.MemberJpaRepository;
import com.example.server.member.service.MemberService;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class JwtTokenProvider implements InitializingBean {
    private static final String AUTHORITIES_KEY = "Claim";
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.access_token_expired}")
    private long tokenExpired;
    private final MemberJpaRepository memberJpaRepository;
    private Key key;


    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(secretKey);
        this.key = new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    public String createToken(Authentication authentication){
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Member member = memberJpaRepository.findByMemberUsername(authentication.getName()).get();

        return Jwts.builder()
                .setSubject(member.getId().toString())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(new Date(new Date().getTime() + tokenExpired))
                .compact();
    }

    public Authentication getAuthentication(String token){
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                .build()
                .parseClaimsJws(token)
                .getBody();


        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(claims.get(AUTHORITIES_KEY).toString()));
        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public String getSubjectFromToken(String token){
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) throws IOException {
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();

            return true;
        }catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            //response.sendError(HttpStatus.SC_UNAUTHORIZED, "잘못된 JWT 서명입니다.");
        }catch (ExpiredJwtException e){
            log.info("만료된 JWT 토큰입니다.");
        }catch (UnsupportedJwtException e){
            log.info("지원되지 않는 JWT 토큰입니다.");
            //response.sendError(HttpStatus.SC_UNAUTHORIZED, "지원되지 않는 JWT 토큰입니다.");
        }catch(IllegalArgumentException e){
            log.info("JWT 토큰이 잘못되었습니다.");
            //response.sendError(HttpStatus.SC_UNAUTHORIZED, "JWT 토큰이 잘못되었습니다.");
        }

        return false;
    }
}
