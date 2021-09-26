package com.kakaoPay.qna.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kakaoPay.qna.dao.CustomerDao;
import com.kakaoPay.qna.dto.CustomerDto;
import com.kakaoPay.qna.dto.QuestionListDto;

@Repository
public class CustomerRepository {
	
	private CustomerDao customerDao;
	
	@Autowired
	public CustomerRepository(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}
	
	public void insertCustomer(CustomerDto customer) {
		customerDao.insertCustomer(customer);
	}
	
	public CustomerDto getCustomer(CustomerDto customer) {
		return customerDao.getCustomer(customer);
	}
		
	public void updateTryCnt(CustomerDto customer) {
		customerDao.updateTryCnt(customer);
	}
	
	public void updateTryCntInit(CustomerDto customer) {
		customerDao.updateTryCntInit(customer);
	}
}
