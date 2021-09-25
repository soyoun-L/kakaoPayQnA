/*********************************************************************************
* usrJoin.js
* 회원 가입
*
*********************************************************************************/
// 회원 가입 div 창 띄우기
// pUserId : 아이디
function fnJoin(pUserId) {
	getElementById("divJoin").style.display = "block"; // 가입 div 보여주기
	
	if(isNull(pUserId)) {
		pUserId = "";
	}
	
	getElementById("txtJoinUserId").value = pUserId; // 가입 아이디
}

// 가입화면 닫기 (초기화)
function fnCloseDiv() {
	getElementById("divJoin").style.display = "none"; // 회원가입 창 display none
	
	getElementById("txtJoinUserId").value = ""; // 아이디
	getElementById("txtJoinUserName").value = ""; // 이름
	getElementById("txtJoinPwdOrg").value = ""; // 비밀번호 1
	getElementById("txtJoinPwdChk").value = ""; // 비밀번호 2
	getElementById("txtPwdCmp").value = ""; // 비밀번호 확인
	getElementById("txtJoinPwdHint").value = ""; // 비밀번호 힌트
	getElementById("txtJoinPwdAnswer").value = ""; // 비밀번호 답 입력
	getElementById("btnJoinLogin").setAttribute("disabled", "disabled"); // 가입 후 로그인 비활성화
}

// 비밀번호 체크
function fnChkPwd() {
	var sPwd1 = getElementById("txtJoinPwdOrg").value; // 비밀번호 1
	var sPwd2 = getElementById("txtJoinPwdChk").value; // 비밀번호 2
	
	var sMsg = "비밀번호를 확인해주세요.";
	var color = "red";
	
	if(!isNull(sPwd1) && !isNull(sPwd2) && sPwd1 == sPwd2) {
		sMsg = "정상입니다.";
		color = "green";
	}
	
	getElementById("txtPwdCmp").style.color = color; // 비밀번호 결과
	getElementById("txtPwdCmp").value = sMsg; // 비밀번호 결과 메시지
	
	fnDisableJoinLoginBtn(); // 가입 후 로그인 버튼 활성/비활성화
}

// 가입 후 로그인 버튼 활성/비활성화
function fnDisableJoinLoginBtn() {
	var sUserId = getElementById("txtJoinUserId").value; // 아이디
	var sUserNm = getElementById("txtJoinUserName").value; // 이름
	var sPwd1 = getElementById("txtJoinPwdOrg").value; // 비밀번호 1
	var sPwd2 = getElementById("txtJoinPwdChk").value; // 비밀번호 2
	var sPwdhint = getElementById("txtJoinPwdHint").value; // 비밀번호 힌트
	var sPwdAnswer = getElementById("txtJoinPwdAnswer").value; // 비밀번호 답 입력
	
	if(isNull(sUserId) || isNull(sUserNm) || isNull(sPwd1) || isNull(sPwd2) || isNull(sPwdhint) || isNull(sPwdAnswer)
	|| sPwd1 != sPwd2) {
		getElementById("btnJoinLogin").setAttribute("disabled", "disabled");  // 가입 후 로그인 비활성화
	} else {
		getElementById("btnJoinLogin").removeAttribute("disabled");  // 가입 후 로그인 활성화
	}
}

// 가입 후 로그인 버튼 클릭
function fnJoinUser() {
	
	if(!confirm("입력하신 정보로 가입하시겠습니까?")) {
		return;
	}
	
	var sUserId = getElementById("txtJoinUserId").value; // 아이디
	var sUserNm = getElementById("txtJoinUserName").value; // 이름
	var sPwd1 = getElementById("txtJoinPwdOrg").value; // 비밀번호 1
	var sPwdhint = getElementById("txtJoinPwdHint").value; // 비밀번호 힌트
	var sPwdAnswer = getElementById("txtJoinPwdAnswer").value; // 비밀번호 답 입력
	
	fnInitUsrParam(); // 상담원 파라미터 초기화
	
	usrparam.userId = sUserId;
	usrparam.userName = sUserNm;
	usrparam.pwd = sPwd1;
	usrparam.pwdAnswer = sPwdAnswer;
	usrparam.pwdHint = sPwdhint;
	
	xmlHttpRequest(TRAN_USR_ID + "getUser.do", "GET_USER", usrparam, completeJoin);
}

// 가입처리 시작
// param : 요청 param
function fnJoinStart(param) {
	xmlHttpRequest(TRAN_USR_ID + "insertUser.do", "USER_JOIN", param, completeJoin);
}

// 실행 완료 후 콜백
function completeJoin(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult); // 에러 메시지 alert
		return;
	}
	
	if(callbackId == "GET_USER") { // 가입처리 시작 fnJoinStart
		if(isNull(rspsResult)) { // 아이디로 조회 된 정보가 없을 경우 가입
			fnJoinStart(rqstParam); // 가입처리 시작
		} else {
			alert(rspsResult.userId + " 아이디는 이미 가입 된 정보 입니다.");
			getElementById("txtJoinUserId").focus();
		}
	}
	
	if(callbackId == "USER_JOIN") { // 가입 후 로그인 버튼 클릭 fnJoinUser
		fnCloseDiv(); // 가입화면 닫기 (초기화)
		
			
		getElementById("txtUserId").value = rqstParam.userId; // 메인 창 아이디 셋팅
		getElementById("txtUserName").value = rqstParam.userName; // 메인 창 이름 셋팅
		
		getElementById("sectionLogin").style.display = "none"; // 로그인 section 숨기기
		
		fnGetAutoNoAnsQnaList(); // 자동조회
		fnGetAnsQnaList(); // Q&A 답변 리스트 조회
	}
}