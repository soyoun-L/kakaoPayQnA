package com.kakaoPay.qna.dto;

public class UserQnaCntDto {
	private String totCnt;
	private String noAnsCnt;
	private String ansCnt;
	
	public String getTotCnt() {
		return totCnt;
	}
	
	public void setTotCnt(String totCnt) {
		this.totCnt = totCnt;
	}
	
	public String getNoAnsCnt() {
		return noAnsCnt;
	}
	
	public void setNoAnsCnt(String noAnsCnt) {
		this.noAnsCnt = noAnsCnt;
	}
	
	public String getAnsCnt() {
		return ansCnt;
	}
	
	public void setAnsCnt(String ansCnt) {
		this.ansCnt = ansCnt;
	}
	
	@Override
	public String toString() {
		return "UserQnaCntDto [totCnt=" + totCnt + ", noAnsCnt=" + noAnsCnt + ", ansCnt=" + ansCnt + "]";
	}
}
