package com.ssafy.be.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Table(name="t_wait_create")
public class WaitCreate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wait_create_seq")
    Long waitCreateSeq;
    @Column(name = "wait_create_name")
    String waitCreateName;
    @Column(name = "wait_create_state")
    Integer waitCreateState;
    @Column(name = "wait_create_user")
    Long userSeq;
    @Column(name = "wait_create_description")
    String waitDescription;
}
