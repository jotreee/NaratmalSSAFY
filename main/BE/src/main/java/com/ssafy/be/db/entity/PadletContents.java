package com.ssafy.be.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "t_padlet_contents")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PadletContents {
    /*padlet_contents_seq bigint PK
padlet_contents_comments varchar(500)
padlet_contents_font_seq bigint
padlet_contents_writer bigint

*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "padlet_contents_seq")
    long padletContentsSeq;

    @Column(name = "padlet_contents_comments")
    String content;

    @Column(name = "padlet_contents_location")
    String location;
    @Column(name = "padlet_contents_title")
    String title;
    @Column(name = "padlet_contents_color")
    String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "padlet_contents_font_seq",referencedColumnName = "font_seq")
    Font font;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="padlet_contents_writer",referencedColumnName = "user_seq")
    User user;
}
