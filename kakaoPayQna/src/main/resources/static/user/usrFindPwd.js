/*********************************************************************************
* usrFindPwd.js
* 비밀번호 찾기
*
*********************************************************************************/
// 비밀번호 찾기 시도
function fnFindPwd() {
	var elmUserId = getElementById("txtLoginUserId");
	var sUserId = elmUserId.value;// 로그인 창 아이디
	
	if(isNull(sUserId)) {
		alert("아이디를 입력해주세요.");
		elmUserId.focus();
		return;
	}
	
	fnInitUsrParam(); // 상담원 파라미터 초기화
	usrparam.userId = sUserId; // 상담원 아이디 셋팅
	
	xmlHttpRequest(TRAN_USR_ID + "getUser.do", "GET_HINT", usrparam, completeFindPwd);
}

// 비밀번호 찾기 div 띄우기
// param : 조회 결과 정보
function fnOpenFindPwd(param) {
	getElementById("txtFindUserId").value = param.userId; // 아이디
	getElementById("txtFindUserName").value = param.userName; // 이름
	getElementById("txtFindPwdHint").value = param.pwdHint; // 힌트
	getElementById("txtFindPwdAnswer").value = ""; // 답
	getElementById("txtPwdAnswerInfo").value = param.pwdAnswer; // 답
	getElementById("txtFindPwd").value = ""; // 비밀번호
	getElementById("txtFindPwdOrg").value = param.pwd; // 비밀번호 정답
	
	getElementById("txtFindPwdAnswer").removeAttribute("readonly"); // 비밀번호 답 활성화
	
	getElementById("divPwdFind").style.display = "block"; // 비밀번호 찾기 div 보여주기
}

// 비밀번호 찾기 창 닫기
function fnCloseFindDiv() {
	getElementById("divPwdFind").style.display = "none"; // 비밀번호 찾기 div 숨기기
}

// 비밀번호 찾기
function fnUserPwdFind() {
	
	var elmAnswer = getElementById("txtFindPwdAnswer");
	var sInputAnswer = elmAnswer.value; // 답
	if(isNull(sInputAnswer)) {
		alert("답을 입력해주세요.");
		elmAnswer.focus();
		return;
	}
	
	var sPwdAnswer = getElementById("txtPwdAnswerInfo").value; // 답
	if(sInputAnswer == sPwdAnswer) {
		getElementById("txtFindPwdAnswer").setAttribute("readonly", "readonly"); // 비밀번호 답 비활성화
		getElementById("txtFindPwd").value = getElementById("txtFindPwdOrg").value; // 비밀번호 셋팅
	} else {
		alert("힌트에 대한 답변이 다릅니다.");
		elmAnswer.focus();
	}
}

// 실행 완료 후 콜백
function completeFindPwd(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult); // 에러 메시지 alert
		return;
	}
	
	if(callbackId == "GET_HINT") { // 비밀번호 찾기 시도 fnFindPwd
		if(isNull(rspsResult)) {
			alert(rqstParam.userId + " 아이디 정보가 없습니다.");
			return;
		}
		
		fnOpenFindPwd(rspsResult); // 비밀번호 찾기 div 띄우기
	}
}