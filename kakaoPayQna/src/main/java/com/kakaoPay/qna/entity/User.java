package com.kakaoPay.qna.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@Column(length=10, insertable=false, updatable=false)
	private String userId;
	
	@Column(length=20)
	private String userName;
	
	@Column(length=10)
	private String pwd;
	
	private int tryCnt;
	
	@Column(length=100)
	private String pwdHint;
	
	@Column(length=100)
	private String pwdAnswer;
	
	@Column(length=14)
	private String rgstDate;
}
