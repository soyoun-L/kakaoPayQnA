package com.kakaoPay.qna.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.kakaoPay.qna.dto.QuestionAnswerDto;
import com.kakaoPay.qna.dto.QuestionListDto;

@Mapper
public interface QuestionAnswerDao {
	
	void insertQuestion(QuestionAnswerDto questionAnswer);
	void updateQuestion(QuestionAnswerDto questionAnswer);
	void updateChargeUser(QuestionAnswerDto questionAnswer);
	void updateAnswer(QuestionAnswerDto questionAnswer);
	void deleteQnaInfo(QuestionAnswerDto questionAnswer);
	List<QuestionListDto> getNoAnswerList();
	QuestionAnswerDto selectQnAInfo(QuestionAnswerDto questionAnswer);
	List<QuestionListDto> getCustomerQuestlist(QuestionListDto question);
}
