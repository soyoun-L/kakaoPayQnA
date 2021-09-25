package com.kakaoPay.qna.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kakaoPay.qna.dao.QuestionAnswerDao;
import com.kakaoPay.qna.dto.QuestionAnswerDto;
import com.kakaoPay.qna.dto.QuestionListDto;

@Repository
public class QuestionAnswerRepository {
	
	private QuestionAnswerDao questionAnswerDao;
	
	@Autowired
	public QuestionAnswerRepository(QuestionAnswerDao questionAnswerDao) {
		this.questionAnswerDao = questionAnswerDao;
	}
	
	public void insertQuestion(QuestionAnswerDto questionAnswer) {
		questionAnswerDao.insertQuestion(questionAnswer);
	}
	
	public void updateQuestion(QuestionAnswerDto questionAnswer) {
		questionAnswerDao.updateQuestion(questionAnswer);
	}
	
	public void updateChargeUser(QuestionAnswerDto questionAnswer) {
		questionAnswerDao.updateChargeUser(questionAnswer);
	}
	
	public void updateAnswer(QuestionAnswerDto questionAnswer) {
		questionAnswerDao.updateAnswer(questionAnswer);
	}
	
	public void deleteQnaInfo(QuestionAnswerDto questionAnswer) {
		questionAnswerDao.deleteQnaInfo(questionAnswer);
	}
	
	public List<QuestionListDto> getNoAnswerList() {
		return questionAnswerDao.getNoAnswerList();
	}
	
	public QuestionAnswerDto selectQnAInfo(QuestionAnswerDto questionAnswer) {
		return questionAnswerDao.selectQnAInfo(questionAnswer);
	}
	
	public List<QuestionListDto> getCustomerQuestlist(QuestionListDto question) {
		return questionAnswerDao.getCustomerQuestlist(question);
	}
}
