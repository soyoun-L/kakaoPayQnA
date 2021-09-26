package com.kakaoPay.qna.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kakaoPay.qna.dto.CustomerDto;
import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.repository.CustomerRepository;

@Service
public class CustomerService {
	private CustomerRepository customerRepository;
	
	@Autowired
	public CustomerService(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	public void insertCustomer(CustomerDto customer) {
		customerRepository.insertCustomer(customer);
	}
	
	public CustomerDto getCustomer(CustomerDto customer) {
		return customerRepository.getCustomer(customer);
	}
	
	public void updateTryCnt(CustomerDto customer) {
		customerRepository.updateTryCnt(customer);
	}
	
	public void updateTryCntInit(CustomerDto customer) {
		customerRepository.updateTryCntInit(customer);
	}
}
