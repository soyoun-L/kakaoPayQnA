package com.kakaoPay.qna.dto;

public class QuestionAnswerDto {
	private String qstSeq;
	private String custId;
	private String custName;
	private String pwd;
	private String title;
	private String memo;
	private String rgstDate;
	private String userId;
	private String chrgDate;
	private String answer;
	private String answerDate;
	
	public String getQstSeq() {
		return qstSeq;
	}

	public void setQstSeq(String qstSeq) {
		this.qstSeq = qstSeq;
	}

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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getRgstDate() {
		return rgstDate;
	}

	public void setRgstDate(String rgstDate) {
		this.rgstDate = rgstDate;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getChrgDate() {
		return chrgDate;
	}

	public void setChrgDate(String chrgDate) {
		this.chrgDate = chrgDate;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getAnswerDate() {
		return answerDate;
	}

	public void setAnswerDate(String answerDate) {
		this.answerDate = answerDate;
	}

	@Override
	public String toString() {
		return "QuestionAnswerDto [qstSeq=" + qstSeq + ", custId=" + custId + ", custName=" + custName + ", pwd=" + pwd
				+ ", title=" + title + ", memo=" + memo + ", rgstDate=" + rgstDate + ", userId=" + userId
				+ ", chrgDate=" + chrgDate + ", answer=" + answer + ", answerDate=" + answerDate + "]";
	}
}
