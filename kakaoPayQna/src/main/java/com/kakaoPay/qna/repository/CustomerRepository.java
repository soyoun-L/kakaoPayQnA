package com.kakaoPay.qna.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kakaoPay.qna.dao.CustomerDao;
import com.kakaoPay.qna.dto.CustomerDto;

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
