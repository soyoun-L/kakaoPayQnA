package com.kakaoPay.qna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kakaoPay.qna.dto.CustomerDto;
import com.kakaoPay.qna.dto.QuestionAnswerDto;
import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.service.QuestionAnswerService;

@RestController
public class QuestionAnswerController {
	private QuestionAnswerService questionAnswerService;
	
	@Autowired
	public QuestionAnswerController(QuestionAnswerService questionAnswerService) {
		this.questionAnswerService = questionAnswerService;
	}
	
	@PostMapping("qna/insertQuestion.do")
	public void insertQuestion(@RequestBody QuestionAnswerDto questionAnswer) {
		questionAnswerService.insertQuestion(questionAnswer);
	}
	
	@PostMapping("qna/updateQuestion.do")
	public void updateQuestion(@RequestBody QuestionAnswerDto questionAnswer) {
		questionAnswerService.updateQuestion(questionAnswer);
	}
	
	@PostMapping("qna/updateChargeUser.do")
	public void updateChargeUser(@RequestBody QuestionAnswerDto questionAnswer) {
		questionAnswerService.updateChargeUser(questionAnswer);
	}
	
	@PostMapping("qna/updateAnswer.do")
	public void updateAnswer(@RequestBody QuestionAnswerDto questionAnswer) {
		questionAnswerService.updateAnswer(questionAnswer);
	}
	
	@PostMapping("qna/deleteQnaInfo.do")
	public void deleteQnaInfo(@RequestBody QuestionAnswerDto questionAnswer) {
		questionAnswerService.deleteQnaInfo(questionAnswer);
	}
	
	@PostMapping("qna/getNoAnswerList.do")
	public List<QuestionListDto> getNoAnswerList() {
		return questionAnswerService.getNoAnswerList();
	}
	
	@PostMapping("qna/selectQnAInfo.do")
	public QuestionAnswerDto selectQnAInfo(@RequestBody QuestionAnswerDto questionAnswer) {
		return questionAnswerService.selectQnAInfo(questionAnswer);
	}
	
	@PostMapping("qna/getCustomerQuestlist.do")
	public List<QuestionListDto> getCustomerQuestlist(@RequestBody QuestionListDto question) {
		return questionAnswerService.getCustomerQuestlist(question);
	}
}
