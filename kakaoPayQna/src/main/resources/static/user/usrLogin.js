/*********************************************************************************
* usrLogin.js
* 로그인
*
*********************************************************************************/
// 로그아웃
function fnLogout() {
	if(!confirm("로그아웃 하시겠습니까?")) {
		return;
	}
	
	getElementById("sectionLogin").style.display = "block";  // 로그인 section 보여주기
	getElementById("txtLoginUserId").value = ""; // 로그인 아이디
	getElementById("txtLoginPwd").value = ""; // 로그인 비밀번호
	
	stopTimer(); // 자동조회 타이머 중지
}

// 로그인 입력 창 엔터키 이벤트
function fnEnterLogin() {
	if(window.event.keyCode == 13) { // 엔터키 다운 시 로그인
		fnLogin(); // 로그인
	}
}

// 로그인
function fnLogin() {
	var elmUserId = getElementById("txtLoginUserId");
	var elmPwd = getElementById("txtLoginPwd");
	var sUserId = elmUserId.value; // 아이디
	var sPwd = elmPwd.value; // 비밀번호
	
	if(isNull(sUserId)) {
		alert("아이디를 입력해주세요.");
		elmUserId.focus();
		return;
	}
	
	if(isNull(sPwd)) {
		alert("비밀번호를 입력해주세요.");
		elmPwd.focus();
		return;
	}
	
	fnInitUsrParam(); // 상담원 파라미터 초기화
	usrparam.userId = sUserId;
	usrparam.pwd = sPwd;
	
	xmlHttpRequest(TRAN_USR_ID + "getUser.do", "GET_USER", usrparam, completeLogin);
}

// 로그인 시도 카운트 증가
// param : 조회 결과 정보
function fnUpdateTryCnt(param) {
	xmlHttpRequest(TRAN_USR_ID + "updateTryCnt.do", "UPD_TRY_CNT", param, completeLogin);
}

// 로그인 성공으로 시도 카운트 0으로 초기화
// param : 조회 결과 정보
function fnUpdateTryCntInit(param) {
	xmlHttpRequest(TRAN_USR_ID + "updateTryCntInit.do", "INIT_TRY_CNT", param, completeLogin);
}

// 실행 완료 후 콜백
function completeLogin(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult); // 에러 메시지 alert
		return;
	}
	
	if(callbackId == "GET_USER") { // 로그인 fnLogin
		var userId = rqstParam.userId;
		var pwd = rqstParam.pwd;
		if(isNull(rspsResult)) { // 아이디로 사용자 정보 찾을 수 없음
			if(confirm(userId + " 아이디는 등록되지 않은 아이디 입니다.\n" + userId + " 아이디로 회원가입 하시겠습니까?")) {
				fnJoin(userId); // 회원 가입 div 창 띄우기 fnJoin
			}
			
			return;
		}
		
		var tryCnt = rspsResult.tryCnt; // 로그인 시도 수
		if(pwd == rspsResult.pwd) { // 비밀번호 일치
			getElementById("sectionLogin").style.display = "none"; // 로그인 section 숨기기
			
			getElementById("txtUserId").value = rspsResult.userId; // 메인 창 아이디 셋팅
			getElementById("txtUserName").value = rspsResult.userName; // 메인 창 이름 셋팅
			
			fnUpdateTryCntInit(rspsResult); // 로그인 성공으로 시도 카운트 0으로 초기화
		} else if(tryCnt > 4) { // 비밀번호 입력 5회 실패
			alert("비밀번호 입력 5회 실패했습니다.\n비밀번호 찾기를 이용해주세요.");
			fnOpenFindPwd(rspsResult); // 비밀번호 찾기 div 띄우기
		} else { // 비밀번호 불일치
			fnUpdateTryCnt(rspsResult); // 로그인 시도 카운트 증가
		}
	}
	
	if(callbackId == "UPD_TRY_CNT") { // 로그인 시도 카운트 증가 fnUpdateTryCnt
		if(rqstParam.tryCnt == 4) { // 시도 (4 + 1)5회
			alert("비밀번호 입력 5회 실패했습니다.\n비밀번호 찾기를 이용해주세요.");
			fnOpenFindPwd(rqstParam);  // 비밀번호 찾기 div 띄우기
		} else {
			alert("비밀번호 입력 " + (rqstParam.tryCnt + 1) + "회 실패했습니다.");
		}
	}
	
	if(callbackId == "INIT_TRY_CNT") { // 로그인 성공으로 시도 카운트 0으로 초기화 fnUpdateTryCntInit
		fnGetAutoNoAnsQnaList(); // 자동조회
		fnGetAnsQnaList(); // Q&A 답변 리스트 조회
	}
}