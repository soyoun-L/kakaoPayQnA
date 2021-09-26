package com.kakaoPay.qna.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.kakaoPay.qna.dto.CustomerDto;
import com.kakaoPay.qna.dto.QuestionListDto;

@Mapper
public interface CustomerDao {
	
	void insertCustomer(CustomerDto customer);
	CustomerDto getCustomer(CustomerDto customer);
	void updateTryCnt(CustomerDto customer);
	void updateTryCntInit(CustomerDto customer);
}
