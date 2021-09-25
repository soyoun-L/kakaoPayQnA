/*********************************************************************************
* custJoin.js
* 회원 가입
*
*********************************************************************************/
// 회원 가입 div 창 띄우기
// pUserId : 아이디
function fnJoin(pCustId) {
	getElementById("divJoin").style.display = "block"; // 가입 div 보여주기
	
	if(isNull(pCustId)) {
		pCustId = "";
	}
	
	getElementById("txtJoinCustId").value = pCustId; // 가입 아이디
}

// 가입화면 닫기 (초기화)
function fnCloseDiv() {
	getElementById("divJoin").style.display = "none"; // 회원가입 창 display none
	
	getElementById("txtJoinCustId").value = ""; // 아이디
	getElementById("txtJoinCustName").value = ""; // 이름
	getElementById("txtJoinPwdOrg").value = ""; // 비밀번호 1
	getElementById("txtJoinPwdChk").value = ""; // 비밀번호 2
	getElementById("txtPwdCmp").value = ""; // 비밀번호 확인
	getElementById("txtJoinPwdHint").value = ""; // 비밀번호 힌트
	getElementById("txtJoinPwdAnswer").value = ""; // 비밀번호 답 입력
	getElementById("btnJoinLogin").setAttribute("disabled", "disabled");
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
	var sCustId = getElementById("txtJoinCustId").value; // 아이디
	var sCustNm = getElementById("txtJoinCustName").value; // 이름
	var sPwd1 = getElementById("txtJoinPwdOrg").value; // 비밀번호 1
	var sPwd2 = getElementById("txtJoinPwdChk").value; // 비밀번호 2
	var sPwdhint = getElementById("txtJoinPwdHint").value; // 비밀번호 힌트
	var sPwdAnswer = getElementById("txtJoinPwdAnswer").value; // 비밀번호 답 입력
	
	if(isNull(sCustId) || isNull(sCustNm) || isNull(sPwd1) || isNull(sPwd2) || isNull(sPwdhint) || isNull(sPwdAnswer)
	|| sPwd1 != sPwd2) {
		getElementById("btnJoinLogin").setAttribute("disabled", "disabled");  // 가입 후 로그인 비활성화
	} else {
		getElementById("btnJoinLogin").removeAttribute("disabled");  // 가입 후 로그인 활성화
	}
}

// 가입 후 로그인 버튼 클릭
function fnJoinCus() {
	
	if(!confirm("입력하신 정보로 가입하시겠습니까?")) {
		return;
	}
	
	var sCustId = getElementById("txtJoinCustId").value; // 아이디
	var sCustNm = getElementById("txtJoinCustName").value; // 이름
	var sPwd1 = getElementById("txtJoinPwdOrg").value; // 비밀번호 1
	var sPwdhint = getElementById("txtJoinPwdHint").value; // 비밀번호 힌트
	var sPwdAnswer = getElementById("txtJoinPwdAnswer").value; // 비밀번호 답 입력
	
	fnInitCustParam(); // 고객 파라미터 초기화
	
	custparam. custId = sCustId;
	custparam.custName = sCustNm;
	custparam.pwd = sPwd1;
	custparam.pwdAnswer = sPwdAnswer;
	custparam.pwdHint = sPwdhint;
	
	xmlHttpRequest(TRAN_CUST_ID + "getCustomer.do", "GET_USER", custparam, completeJoin);
}

// 가입처리 시작
// param : 요청 param
function fnJoinStart(param) {
	xmlHttpRequest(TRAN_CUST_ID + "insertCustomer.do", "CUST_JOIN", param, completeJoin);
}

// 실행 완료 후 콜백
function completeJoin(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult);
		return;
	}
	
	if(callbackId == "GET_USER") { // 가입처리 시작 fnJoinStart
		if(isNull(rspsResult)) { // 아이디로 조회 된 정보가 없을 경우 가입
			fnJoinStart(rqstParam); // 가입처리 시작
		} else {
			alert(rspsResult.custId + " 아이디는 이미 가입 된 정보 입니다.");
			getElementById("txtJoinCustId").focus();
		}
	}
	
	if(callbackId == "CUST_JOIN") {  // 가입 후 로그인 버튼 클릭 fnJoinCus
		fnCloseDiv(); // 가입화면 닫기 (초기화)
			
		getElementById("txtCustId").value = rqstParam.custId; // 메인 창 아이디 셋팅
		getElementById("txtCustName").value = rqstParam.custName; // 메인 창 이름 셋팅
		
		getElementById("sectionLogin").style.display = "none"; // 로그인 section 숨기기
		
		fnGetQnaList(); // Q&A 리스트 조회
	}
}