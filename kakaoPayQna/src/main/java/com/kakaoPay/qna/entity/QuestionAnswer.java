package com.kakaoPay.qna.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class QuestionAnswer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String qstSeq;
	
	@Column(length=10, nullable=false)
	private String custId;
	
	@Column(length=10)
	private String pwd;
	
	@Column(length=20)
	private String custName;
	
	@Column(length=100)
	private String title;
	
	@Column(length=200)
	private String memo;
	
	@Column(length=14)
	private String rgstDate;
	
	@Column(length=10)
	private String userId;
	
	@Column(length=14)
	private String chrgDate;
	
	@Column(length=200)
	private String answer;
	
	@Column(length=14)
	private String answerDate;
}
