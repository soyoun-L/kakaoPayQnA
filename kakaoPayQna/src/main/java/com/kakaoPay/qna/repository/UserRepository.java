package com.kakaoPay.qna.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kakaoPay.qna.dao.UserDao;
import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.dto.UserDto;
import com.kakaoPay.qna.dto.UserQnaCntDto;

@Repository
public class UserRepository {
	
	private UserDao userDao;
	
	@Autowired
	public UserRepository(UserDao userDao) {
		this.userDao = userDao;
	}
	
	public void insertUser(UserDto user) {
		userDao.insertUser(user);
	}
	
	public UserDto getUser(UserDto user) {
		return userDao.getUser(user);
	}
	
	public List<QuestionListDto> getUserQnalist(UserDto user) {
		return userDao.getUserQnalist(user);
	}
	
	public void updateTryCnt(UserDto user) {
		userDao.updateTryCnt(user);
	}
	
	public void updateTryCntInit(UserDto user) {
		userDao.updateTryCntInit(user);
	}
	
	public UserQnaCntDto getUserQnaCnt(UserDto user) {
		return userDao.getUserQnaCnt(user);
	}
}
