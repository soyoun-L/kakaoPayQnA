package com.kakaoPay.qna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.dto.UserDto;
import com.kakaoPay.qna.dto.UserQnaCntDto;
import com.kakaoPay.qna.service.UserService;

@RestController
public class UserController {
	private UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("user/insertUser.do")
	public void insertUser(@RequestBody UserDto user) {
		userService.insertUser(user);
	}
	
	@PostMapping("user/getUser.do")
	public UserDto getUser(@RequestBody UserDto user) {
		return userService.getUser(user);
	}
	
	@PostMapping("user/getUserQnalist.do")
	public List<QuestionListDto> getUserQnalist(@RequestBody UserDto user) {
		return userService.getUserQnalist(user);
	}
	
	@PostMapping("user/updateTryCnt.do")
	public void updateTryCnt(@RequestBody UserDto user) {
		userService.updateTryCnt(user);
	}
	
	@PostMapping("user/updateTryCntInit.do")
	public void updateTryCntInit(@RequestBody UserDto user) {
		userService.updateTryCntInit(user);
	}
	
	@PostMapping("user/getUserQnaCnt.do")
	public UserQnaCntDto getUserQnaCnt(@RequestBody UserDto user) {
		return userService.getUserQnaCnt(user);
	}
}
