package com.kakaoPay.qna.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kakaoPay.qna.dto.QuestionAnswerDto;
import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.repository.QuestionAnswerRepository;

@Service
public class QuestionAnswerService {
	private QuestionAnswerRepository questionAnswerRepository;
	
	@Autowired
	public QuestionAnswerService(QuestionAnswerRepository questionAnswerRepository) {
		this.questionAnswerRepository = questionAnswerRepository;
	}
	
	public void insertQuestion(QuestionAnswerDto questionAnswer) {
		questionAnswerRepository.insertQuestion(questionAnswer);
	}
	
	public void updateQuestion(QuestionAnswerDto questionAnswer) {
		questionAnswerRepository.updateQuestion(questionAnswer);
	}
	
	public void updateChargeUser(QuestionAnswerDto questionAnswer) {
		questionAnswerRepository.updateChargeUser(questionAnswer);
	}
	
	public void updateAnswer(QuestionAnswerDto questionAnswer) {
		questionAnswerRepository.updateAnswer(questionAnswer);
	}
	
	public void deleteQnaInfo(QuestionAnswerDto questionAnswer) {
		questionAnswerRepository.deleteQnaInfo(questionAnswer);
	}
	
	public List<QuestionListDto> getNoAnswerList() {
		return questionAnswerRepository.getNoAnswerList();
	}
	
	public QuestionAnswerDto selectQnAInfo(QuestionAnswerDto questionAnswer) {
		return questionAnswerRepository.selectQnAInfo(questionAnswer);
	}
	
	public List<QuestionListDto> getCustomerQuestlist(QuestionListDto question) {
		return questionAnswerRepository.getCustomerQuestlist(question);
	}
}
