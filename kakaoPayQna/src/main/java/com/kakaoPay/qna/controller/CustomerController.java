package com.kakaoPay.qna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kakaoPay.qna.dto.CustomerDto;
import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.service.CustomerService;

@RestController
public class CustomerController {
	private CustomerService customerService;
	
	@Autowired
	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}
	
	@PostMapping("customer/insertCustomer.do")
	public void insertCustomer(@RequestBody CustomerDto customer) {
		customerService.insertCustomer(customer);
	}
	
	@PostMapping("customer/getCustomer.do")
	public CustomerDto getCustomer(@RequestBody CustomerDto customer) {
		return customerService.getCustomer(customer);
	}
	
	@PostMapping("customer/getCustomerQnaList.do")
	public List<QuestionListDto> getCustomerQnaList(@RequestBody CustomerDto customer) {
		return customerService.getCustomerQnalist(customer);
	}
	
	@PostMapping("customer/updateTryCnt.do")
	public void updateTryCnt(@RequestBody CustomerDto customer) {
		customerService.updateTryCnt(customer);
	}
	
	@PostMapping("customer/updateTryCntInit.do")
	public void updateTryCntInit(@RequestBody CustomerDto customer) {
		customerService.updateTryCntInit(customer);
	}
}
