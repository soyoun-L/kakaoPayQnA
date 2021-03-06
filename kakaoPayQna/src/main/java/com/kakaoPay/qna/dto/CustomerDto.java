package com.kakaoPay.qna.dto;

public class CustomerDto {
	private String custId;
	private String custName;
	private String pwd;
	private int tryCnt;
	private String pwdHint;
	private String pwdAnswer;
	private String rgstDate;
	
	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
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
		return "Customer [custId=" + custId + ", custName=" + custName + ", pwd=" + pwd + ", tryCnt=" + tryCnt
				+ ", pwdHint=" + pwdHint + ", pwdAnswer=" + pwdAnswer + ", rgstDate=" + rgstDate + "]";
	}
}
