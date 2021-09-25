package com.kakaoPay.qna.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.kakaoPay.qna.dto.QuestionListDto;
import com.kakaoPay.qna.dto.UserDto;
import com.kakaoPay.qna.dto.UserQnaCntDto;

@Mapper
public interface UserDao {
	
	void insertUser(UserDto user);
	UserDto getUser(UserDto user);
	List<QuestionListDto> getUserQnalist(UserDto user);
	void updateTryCnt(UserDto user);
	void updateTryCntInit(UserDto user);
	UserQnaCntDto getUserQnaCnt(UserDto user);
}
