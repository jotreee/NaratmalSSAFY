package com.ssafy.be.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "t_user_font")
public class UserFont {
    /*
    * user_font_seq bigint PK
user_seq bigint
font_seq bigint*/

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_font_seq")
    long userFontSeq;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq",referencedColumnName = "user_seq")
    User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "font_seq",referencedColumnName = "font_seq")
    Font font;
}
