package com.example.server.member.entity;

import com.example.server.likes.entity.Likes;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Member")
public class Member implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Boolean disable;
    @Email
    String email;

    String username;

    String password;

    String imageUrl;

    @Enumerated(EnumType.STRING)
    Role role;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Likes> likes;

    //
    public void addLike(Likes likes){
        this.likes.add(likes);
        if(likes.getMember() != this){
            likes.addMember(this);
        }
    }

    public void deleteLike(Likes likes){
        this.likes.remove(likes);
    }

    @Getter
    public enum Role{
        USER("ROLE_USER"),
        ADMIN("ROLE_ADMIN");

        String key;
        Role(String key) {
            this.key = key;
        }
    }

    public Member update(String name){
        this.username = name;

        return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authList = new ArrayList<>();
        authList.add(new SimpleGrantedAuthority(role.getKey()));

        return authList;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
