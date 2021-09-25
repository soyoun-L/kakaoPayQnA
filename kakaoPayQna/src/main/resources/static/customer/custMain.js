/*********************************************************************************
* custMain.js
* 고객 문의 접수 메인
*
*********************************************************************************/
// 문의 리스트 컬럼 정보
var columns = [["no","text"]
			, ["stateName","text"]
			, ["title","text"]
			, ["userName","text"]
			, ["answerDate","date"]
			, ["rgstDate","date"]];

// 거래 요청 고객 파라미터
var custparam = {
	"custId": null,
	"custName": null,
	"pwd": null,
	"pwdAnswer":null,
	"pwdHint": null
};

// 고객 파라미터 초기화
function fnInitCustParam() {
	custparam.custId = null;
	custparam.custName = null;
	custparam.pwd = null;
	custparam.pwdAnswer = null;
	custparam.pwdHint = null;
}

// Q&A 리스트 조회
function fnGetQnaList() {
	getElementById("bodyQnaList").innerHTML = "";
	fnInitQnAParam(); // Q&A 파라미터 초기화
	fnSetDtlInfo(); // 문의 상세 정보 셋팅

	xmlHttpRequest(TRAN_CUST_ID + "getCustomerQnaList.do", "GET_QNA_LIST", custparam, completeMain);
}

// 그리드 리스트 셋팅
function fnSetGridList(rsltList) {
	var elmRow = null;
	var elmCell = null;
	var innerText = "";
	var columnId = "";
	var idx = 0;
	var sNo = "";
	
	getElementById("txtQnACnt").value = rsltList.length; // 문의 건 수 셋팅
	
	for(var i = 0; i < rsltList.length; i++) {
		elmRow = getElementById("bodyQnaList").insertRow(i);
		elmRow.addEventListener("click", function() { // 클릭 이벤트 추가
			sNo = this.cells[0].innerText;
			
			idx = Number(sNo) - 1;
			fnClickQustListRow(idx, rsltList[idx]);
		});
		
		for(var c = 0; c < columns.length; c++) {
			elmCell = elmRow.insertCell(c);
			
			columnId = columns[c][0];
			if(columnId == "no") {
				innerText = (i + 1);
			} else {
				if(columns[c][1] == "date") {
					innerText = setDateTimeFormat(rsltList[i][columnId]); // 날짜 형식 변환
				} else {
					innerText = rsltList[i][columnId];
				}
			}
			
			elmCell.innerText = innerText;
		}
	}
}

// 그리드 리스트 클릭 이벤트
function fnClickQustListRow(idx, listInfo) {
	fnClickListRow("tbQnaList", idx)
	
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
	getElementById("txtUserName").value = questionparam.userName; // 담당 상담원
	getElementById("txtCurState").value = questionparam.stateName; // 진행상태
	
	var bDel = true;
	var bDisable = false;
	if(!isNull(questionparam.qstSeq)) { // 문의 id가 있을 경우
		if(questionparam.stateCd != "00") { // 00 : 배정대기, 01 : 답변대기, 02 : 답변완료
			bDisable = true; // 배정대기 상태가 아닐 경우 제목, 문의내용, 저장버튼 비활성화
		} else {
			bDel = false; // 배정대기 일 경우 삭제 버튼 활성화
		}
	}
	
	disabledButton(bDel, "btnDel"); // 제목
	
	disabledButton(bDisable, "txtTitle"); // 제목
	disabledButton(bDisable, "txtMemo"); // 문의내용
	disabledButton(bDisable, "btnSave"); // 저장 버튼
}

// 삭제 버튼 클릭
// 삭제 대상 문의에 배정 상담원이 있는지 체크
function fnDelQnaData() {
	
	if(isNull(questionparam.qstSeq)) {
		alert("선택 된 문의가 없습니다.");
		return;
	}
	
	if(!confirm("삭제하시겠습니까?")) {
		return;
	}
	
	xmlHttpRequest(TRAN_QNA_ID + "selectQnAInfo.do", "CHECK_CRG_USR", questionparam, completeMain);
}

// 문의 삭제
// param : 거래 요청 데이터
function fnDelete(param) {
	xmlHttpRequest(TRAN_QNA_ID + "deleteQnaInfo.do", "DEL_QNA", param, completeMain);
}

// 신규 버튼 클릭
function fnNewQnaData() {
	fnInitQnAParam(); // Q&A 파라미터 초기화
	fnSetDtlInfo(); // 문의 상세 정보 셋팅
}

// 저장 버튼 클릭
function fnSaveQnaData() {
	var sTitle = getElementById("txtTitle").value; // 제목
	var sMemo = getElementById("txtMemo").value; // 문의내용
	
	if(isNull(sTitle)) {
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
	
	questionparam.custId = custparam.custId; // 고객번호
	questionparam.title = sTitle; // 제목
	questionparam.memo = sMemo; // 문의내용
	
	var sTranUrl = "";
	var sCallBackId = "";
	if(!isNull(questionparam.qstSeq)) { // 문의id가 있을 경우 수정
		sTranUrl = "updateQuestion.do";
		sCallBackId = "UPDATE_QNA";
	} else { // 문의id가 없을 경우 신규 저장
		sTranUrl = "insertQuestion.do";
		sCallBackId = "SAVE_QNA";
	}
	
	xmlHttpRequest(TRAN_QNA_ID + sTranUrl, sCallBackId, questionparam, completeMain);
}

// 실행 완료 후 콜백
function completeMain(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult); // 에러 메시지 alert
		return;
	}
	
	if(callbackId == "GET_QNA_LIST") { // Q&A 리스트 조회 fnGetQnaLis
		if(isNull(rspsResult)) {
			getElementById("txtQnACnt").value = 0; // 문의건수
		} else {
			fnSetGridList(rspsResult); // 그리드 리스트 셋팅
		}
	}
	if(callbackId == "SAVE_QNA") { // 저장 버튼 클릭 (신규) fnSaveQnaData
		alert("문의가 등록되었습니다.");
		fnGetQnaList();
	}
	
	if(callbackId == "UPDATE_QNA") { // 저장 버튼 클릭 (수정) fnSaveQnaData
		alert("문의가 수정 되었습니다.");
		fnGetQnaList();
	}
	
	if(callbackId == "CHECK_CRG_USR") { // 삭제 버튼 클릭, 삭제 대상 문의에 배정 상담원이 있는지 체크 fnDelQnaData
		if(isNull(rspsResult.userId)) {
			fnDelete(rqstParam);
		} else {
			alert("이미 배정 되었습니다.\n삭제가 불가능합니다.");
			fnGetQnaList();
		}
	}
	
	if(callbackId == "DEL_QNA") { // 삭제 버튼 클릭 fnDelQnaData
		alert("삭제되었습니다.");
		fnGetQnaList();
	}
}