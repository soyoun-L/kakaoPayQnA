package com.kakaoPay.qna.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.dto.UserDto;
import com.kakaoPay.qna.dto.UserQnaCntDto;
import com.kakaoPay.qna.repository.UserRepository;

@Service
public class UserService {
	private UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public void insertUser(UserDto user) {
		userRepository.insertUser(user);
	}
	
	public UserDto getUser(UserDto user) {
		return userRepository.getUser(user);
	}
	
	public List<QuestionListDto> getUserQnalist(UserDto user) {
		return userRepository.getUserQnalist(user);
	}
	
	public void updateTryCnt(UserDto user) {
		userRepository.updateTryCnt(user);
	}
	
	public void updateTryCntInit(UserDto user) {
		userRepository.updateTryCntInit(user);
	}
	
	public UserQnaCntDto getUserQnaCnt(UserDto user) {
		return userRepository.getUserQnaCnt(user);
	}
}
