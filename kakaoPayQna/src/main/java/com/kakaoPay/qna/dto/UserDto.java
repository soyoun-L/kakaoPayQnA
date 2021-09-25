package com.kakaoPay.qna.dto;

public class UserDto {
	private String userId;
	private String userName;
	private String pwd;
	private int tryCnt;
	private String pwdHint;
	private String pwdAnswer;
	private String rgstDate;
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public int getTryCnt() {
		return tryCnt;
	}

	public void setTryCnt(int tryCnt) {
		this.tryCnt = tryCnt;
	}

	public String getPwdHint() {
		return pwdHint;
	}

	public void setPwdHint(String pwdHint) {
		this.pwdHint = pwdHint;
	}

	public String getPwdAnswer() {
		return pwdAnswer;
	}

	public void setPwdAnswer(String pwdAnswer) {
		this.pwdAnswer = pwdAnswer;
	}

	public String getRgstDate() {
		return rgstDate;
	}

	public void setRgstDate(String rgstDate) {
		this.rgstDate = rgstDate;
	}
	
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", pwd=" + pwd + ", tryCnt=" + tryCnt
				+ ", pwdHint=" + pwdHint + ", pwdAnswer=" + pwdAnswer + ", rgstDate=" + rgstDate + "]";
	}
}
