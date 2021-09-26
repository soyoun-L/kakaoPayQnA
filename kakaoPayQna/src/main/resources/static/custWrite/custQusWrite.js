/*********************************************************************************
* custQusWrite.js
* 고객 문의 등록(비로그인)
*
*********************************************************************************/
// 팝업 창 닫기 버튼 클릭
function fnClosePop() {
	window.close();
}

// 저장 버튼 클릭
function fnSaveQnaData() {
	var sCustName = getElementById("txtCustName").value; // 이름
	var sCustId = getElementById("txtCustId").value; // 아이디
	var sPwd = getElementById("txtCustPwd").value; // 비밀번호
	var sTitle = getElementById("txtTitle").value; // 제목
	var sMemo = getElementById("txtMemo").value; // 문의내용
	
	if(isNull(sCustName)) {
		alert("이름을 입력해주세요.");
		getElementById("txtCustName").focus();
		return;
	} else if(isNull(sCustId)) {
		alert("아이디를 입력해주세요.");
		getElementById("txtCustId").focus();
		return;
	} else if(isNull(sPwd)) {
		alert("비밀번호를 입력해주세요.");
		getElementById("txtCustPwd").focus();
		return;
	} else if(isNull(sTitle)) {
		alert("제목을 입력해주세요.");
		getElementById("txtTitle").focus();
		return;
	} else if(isNull(sMemo)) {
		alert("문의 내용을 입력해주세요.");
		getElementById("txtMemo").focus();
		return;
	}
	
	if(!confirm("저장하시겠습니까?")) {
		return;
	}
	
	questionparam.custName = sCustName; // 이름
	questionparam.custId = sCustId; // 고객번호
	questionparam.pwd = sPwd; // 비밀번호
	questionparam.title = sTitle; // 제목
	questionparam.memo = sMemo; // 문의내용
	
	xmlHttpRequest(TRAN_QNA_ID + "insertQuestion.do", "SAVE_QNA", questionparam, completeMain);
}

// 실행 완료 후 콜백
function completeMain(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult); // 에러 메시지 alert
		return;
	}
	
	if(callbackId == "SAVE_QNA") { // 저장 버튼 클릭 (신규) fnSaveQnaData
		alert("문의가 등록되었습니다.");
		window.opener.fnGetQnaList();
		fnClosePop();
	}
}