package com.kakaoPay.qna.entity;

import javax.persistence.Entity;
import javax.persistence.Id;


import javax.persistence.Column;

@Entity
public class Customer {
	@Id
	@Column(length=10, insertable=false, updatable=false)
	private String custId;
	
	@Column(length=20)
	private String custName;
	
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
