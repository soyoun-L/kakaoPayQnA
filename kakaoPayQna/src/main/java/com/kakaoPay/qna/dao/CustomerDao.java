package com.kakaoPay.qna.dao;

import org.apache.ibatis.annotations.Mapper;
import com.kakaoPay.qna.dto.CustomerDto;

@Mapper
public interface CustomerDao {
	
	void insertCustomer(CustomerDto customer);
	CustomerDto getCustomer(CustomerDto customer);
	void updateTryCnt(CustomerDto customer);
	void updateTryCntInit(CustomerDto customer);
}
