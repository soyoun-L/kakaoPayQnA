/*********************************************************************************
* usrMain.js
* 상담원 문의 답변 메인
*
*********************************************************************************/
var timerIntervalId = null; // 타이머

// 문의 리스트 컬럼 정보
var noAnsColumns = [["no","text"]
			, ["button","button"]
			, ["custName","text"]
			, ["title","text"]
			, ["rgstDate","date"]];
			
// 답변 리스트 컬럼 정보
var ansColumns = [["no","text"]
				, ["stateName","text"]
				, ["custName","text"]
				, ["title","text"]
				, ["answerDate","date"]
				, ["rgstDate","date"]];

// 거래 요청 고객 파라미터
var usrparam = {
	"userId": null,
	"userName": null,
	"pwd": null,
	"pwdAnswer":null,
	"pwdHint": null
};

// 문의 리스트
var noansList = null;

// 상담원 파라미터 초기화
function fnInitUsrParam() {
	usrparam.userId = null;
	usrparam.userName = null;
	usrparam.pwd = null;
	usrparam.pwdAnswer = null;
	usrparam.pwdHint = null;
}

// 타이머 시작
function startTimer() {
	if(timerIntervalId != null) { // 타이머 호출 정보가 있을 경우 타이머 중지
		clearInterval(timerIntervalId);
	}
	
	timerIntervalId = setInterval(fnGetNoAnsQnaList, 1000 * 10); // 10초마다 호출
}

// 타이머 종료
function stopTimer() {
	getElementById("btnGetAutoNoAnsQnaList").style.background = ""; // 자동조회
	getElementById("btnGetMnlNoAnsQnaList").style.background = "darkorange"; // 수동조회
	
	if(timerIntervalId != null) { // 타이머 호출 정보가 있을 경우 타이머 중지
		clearInterval(timerIntervalId);
	}
	
	timerIntervalId = null;
}

// 자동조회
function fnGetAutoNoAnsQnaList() {
	getElementById("btnGetAutoNoAnsQnaList").style.background = "darkorange"; // 자동조회
	getElementById("btnGetMnlNoAnsQnaList").style.background = ""; // 수동조회
	
	fnGetNoAnsQnaList(); // Q&A 문의 리스트 조회
	
	startTimer(); // 타이머 시작
}

// 수동조회
function fnGetAutoMnlAnsQnaList() {
	stopTimer(); // 타이머 중지
	
	fnGetNoAnsQnaList(); // Q&A 문의 리스트 조회
}

// Q&A 문의 리스트 조회
function fnGetNoAnsQnaList() {
	getElementById("bodyNoAnsQnaList").innerHTML = "";
	
	xmlHttpRequest(TRAN_QNA_ID + "getNoAnswerList.do", "GET_NO_ANS_QNA_LIST", usrparam, completeMain);
}

// 그리드 문의 리스트 셋팅
// rsltList : 조회 결과 정보
function fnSetNoAnsGridList(rsltList) {
	var elmRow = null; // row 객체
	var elmCell = null; // cell 객체
	var innerText = "";
	var columnId = "";
	var idx = 0;
	var sNo = "";
	
	for(var i = 0; i < rsltList.length; i++) {
		elmRow = getElementById("bodyNoAnsQnaList").insertRow(i);
		elmRow.addEventListener("click", function() { // 클릭 이벤트 추가
			sNo = this.cells[0].innerText;
			
			idx = Number(sNo) - 1;
			fnClickListRow("tbNoAnsQnaList", idx);
		});
		
		for(var c = 0; c < noAnsColumns.length; c++) { // 컬럼 순서에 맞춰 row 생성
			elmCell = elmRow.insertCell(c);
			
			columnId = noAnsColumns[c][0];
			if(columnId == "button") {
				elmCell.innerHTML = "<button onclick='fnChkChrgUser(" + i + ")'>배정</button>";
				elmCell.style.textAlign = "center";
			} else {
				if(columnId == "no") {
					innerText = (i + 1);
				} else {
					if(noAnsColumns[c][1] == "date") {
						innerText = setDateTimeFormat(rsltList[i][columnId]);
					} else {
						innerText = rsltList[i][columnId];
					}
				}
				
				elmCell.innerText = innerText;
			}
		}
	}
}

// 배정 버튼 클릭
function fnChkChrgUser(idx) {
	if(!confirm("배정하시겠습니까?")) {
		return;
	}
	
	noansList[idx].userId = usrparam.userId;
	
	xmlHttpRequest(TRAN_QNA_ID + "selectQnAInfo.do", "CHECK_CRG_USR", noansList[idx], completeMain);
}

// 문의 상담원 배정
// param : 거래 요청 파라미터, result : 결과 정보
function fnSetChrgUser(param, result) {
	if(isNull(result)) {
		alert("문의가 삭제 되었습니다.");
		return;
	} else if(!isNull(result.userId)) {
		alert("이미 배정 된 고객입니다.");
		return;
	}
	xmlHttpRequest(TRAN_QNA_ID + "updateChargeUser.do", "UPDATE_CRG_USR", param, completeMain);
}

// 사용자 문의 건 수 조회
function fnUserQnaCnt() {
	getElementById("txtQnACnt").value = ""; // 배정건수
	getElementById("txtAnsQnACnt").value = ""; // 답변완료문의건수
	getElementById("txtNoAnsQnACnt").value = ""; // 답변대기문의건수
	
	xmlHttpRequest(TRAN_USR_ID + "getUserQnaCnt.do", "GET_QNA_CNT", usrparam, completeMain);
}

// Q&A 답변 리스트 조회
function fnGetAnsQnaList() {
	getElementById("bodyAnsQnaList").innerHTML = ""; // tr 초기화
	fnInitQnAParam(); // Q&A 파라미터 초기화
	fnSetDtlInfo(); // 문의 상세 정보 셋팅

	xmlHttpRequest(TRAN_USR_ID + "getUserQnalist.do", "GET_QNA_LIST", usrparam, completeMain);
}

// 그리드 답변 리스트 셋팅
// rsltList : 조회 결과 정보
function fnSetAnsGridList(rsltList) {
	var elmRow = null; // row 객체
	var elmCell = null; // cell 객체
	var innerText = "";
	var columnId = "";
	var idx = 0;
	var sNo = "";
	
	for(var i = 0; i < rsltList.length; i++) {
		elmRow = getElementById("bodyAnsQnaList").insertRow(i);
		elmRow.addEventListener("click", function() { // 클릭 이벤트 추가
			sNo = this.cells[0].innerText;
			
			idx = Number(sNo) - 1;
			fnClickAnsQnaListRow(idx, rsltList[idx]);
		});
		
		for(var c = 0; c < ansColumns.length; c++) { // 컬럼 순서에 맞춰 row 생성
			elmCell = elmRow.insertCell(c);
			
			columnId = ansColumns[c][0];
			if(columnId == "no") {
				innerText = (i + 1);
			} else {
				if(ansColumns[c][1] == "date") {
					innerText = setDateTimeFormat(rsltList[i][columnId]);
				} else {
					innerText = rsltList[i][columnId];
				}
			}
			
			elmCell.innerText = innerText;
		}
	}
}

// 그리드 답변 리스트 클릭 이벤트
function fnClickAnsQnaListRow(idx, listInfo) {
	
	fnClickListRow("tbAnsQnaList", idx); // 그리드 클릭 row 표시
	
	questionparam = listInfo; // 답변 상세 정보 담기
	fnSetDtlInfo(); // 문의 상세 정보 셋팅
}

// 문의 상세 정보 셋팅
function fnSetDtlInfo() {
	getElementById("txtTitle").value = questionparam.title; // 제목
	getElementById("txtMemo").value = questionparam.memo; // 문의내용
	getElementById("txtAnswer").value = questionparam.answer; // 답변내용
	getElementById("rgst_date").value = setDateTimeFormat(questionparam.rgstDate); // 등록일자
	getElementById("txtAnswerDate").value = setDateTimeFormat(questionparam.answerDate); // 답변일자
	getElementById("txtCustName").value = questionparam.custName; // 고객명
	getElementById("txtCurState").value = questionparam.stateName; // 진행상태
	
	var bDisable = true;
	if(!isNull(questionparam.qstSeq)) { // 문의 id 정보가 있을경우
		if(questionparam.stateCd == "01") { // 00 : 배정대기, 01 : 답변대기, 02 : 답변완료
			bDisable = false; // 답변 대기 일 경우에만 내용입력, 저장버튼 활성화
		}
	}
	
	disabledButton(bDisable, "txtAnswer"); // 답변내용
	disabledButton(bDisable, "btnSave"); // 저장 버튼
}

// 저장 버튼 클릭
function fnSaveQnaData() {
	var sAnswer = getElementById("txtAnswer").value; // 답변내용
	
	if(isNull(sAnswer)) {
		alert("답변 내용을 입력해주세요.");
		getElementById("txtAnswer").focus();
		return;
	}
	
	if(!confirm("저장하시겠습니까?")) {
		return;
	}
	
	questionparam.answer = sAnswer; // 문의내용
	
	xmlHttpRequest(TRAN_QNA_ID + "updateAnswer.do", "UPDATE_ANSWER", questionparam, completeMain);
}

// 실행 완료 후 콜백
function completeMain(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult); // 에러 메시지 alert
		return;
	}
	
	if(callbackId == "GET_NO_ANS_QNA_LIST") {
		noansList = null;
		if(!isNull(rspsResult)) {
			noansList = rspsResult;
			fnSetNoAnsGridList(rspsResult);
		}
	}
	
	if(callbackId == "CHECK_CRG_USR") {
		fnSetChrgUser(rqstParam, rspsResult);
	}
	
	if(callbackId == "UPDATE_CRG_USR") {
		alert("배정되었습니다.");
		fnGetNoAnsQnaList(); // Q&A 문의 리스트 조회
		fnGetAnsQnaList(); // Q&A 답변 리스트 조회
	}
	
	if(callbackId == "GET_QNA_LIST") { // Q&A 답변 리스트 조회 fnGetAnsQnaList
		if(!isNull(rspsResult)) {
			fnSetAnsGridList(rspsResult); // 그리드 답변 리스트 셋팅
		}
		
		fnUserQnaCnt(); // 사용자 문의 건 수 조회
	}
	
	if(callbackId == "UPDATE_ANSWER") { // 저장 버튼 클릭 fnSaveQnaData
		alert("답변이 등록 되었습니다.");
		fnGetAnsQnaList(); // Q&A 답변 리스트 조회
	}
	
	if(callbackId == "GET_QNA_CNT") { // 사용자 문의 건 수 조회 fnUserQnaCnt
		getElementById("txtQnACnt").value = rspsResult.totCnt;
		getElementById("txtAnsQnACnt").value = rspsResult.ansCnt;
		getElementById("txtNoAnsQnACnt").value = rspsResult.noAnsCnt;
	}
}