/*********************************************************************************
* custQus.js
* 고객 문의 조회(비로그인)
*
*********************************************************************************/
var TRAN_CUST_ID = "customer/"; // 고객 관련 데이터 거래 요청용

// 문의 리스트 컬럼 정보
var columns = [["no","text"]
			, ["stateName","text"]
			, ["title","text"]
			, ["custId","text"]
			, ["custName","text"]
			, ["userName","text"]
			, ["answerDate","date"]
			, ["rgstDate","date"]];

// 거래 요청 고객 파라미터
var custparam = {
	"custId": null,
	"custName": null,
	"pwd": null,
	"stateCd":null
};

// html body onload 이벤트
function fnOnload() {
	fnGetQnaList();
}

// 고객 파라미터 초기화
function fnInitCustParam() {
	custparam.custId = null;
	custparam.custName = null;
	custparam.pwd = null;
	custparam.stateCd = null;
}

// 조회 조건 부 엔터키 이벤트
function fnEnterSrch() {
	if(window.event.keyCode == 13) { // 엔터키 다운 시 로그인
		fnGetQnaList(); // 로그인
	}
}

// Q&A 리스트 조회
function fnGetQnaList() {
	getElementById("bodyQnaList").innerHTML = "";
	fnInitQnAParam(); // Q&A 파라미터 초기화
	fnSetDtlInfo(); // 문의 상세 정보 셋팅
	
	var custId = getElementById("txtCustId").value;
	var custName = getElementById("txtCustName").value;
	//cmbState
	var cmbState = getElementById("cmbState")
	var stateCd = cmbState.options[cmbState.selectedIndex].value;
	
	custparam.custId = custId;
	custparam.custName = custName;
	custparam.stateCd = stateCd;

	xmlHttpRequest(TRAN_QNA_ID + "getCustomerQuestlist.do", "GET_QNA_LIST", custparam, completeMain);
}

// 그리드 리스트 셋팅
function fnSetGridList(rsltList) {
	var elmRow = null;
	var elmCell = null;
	var innerText = "";
	var columnId = "";
	var idx = 0;
	var sNo = "";
	
	for(var i = 0; i < rsltList.length; i++) {
		elmRow = getElementById("bodyQnaList").insertRow(i);
		elmRow.addEventListener("click", function() { // 클릭 이벤트 추가
			sNo = this.cells[0].innerText;
			
			idx = Number(sNo);
			fnClickQustListRow(idx, rsltList[idx - 1]);
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
	fnCloseDelDiv(); // 삭제div 숨기기
	fnCloseUpdDiv(); // 수정div 숨기기
	
	getElementById("txtRgstCustId").value = questionparam.custId; // 아이디
	getElementById("txtRgstCustName").value = questionparam.custName; // 이름
	getElementById("txtTitle").value = questionparam.title; // 제목
	getElementById("txtMemo").value = questionparam.memo; // 문의내용
	getElementById("txtAnswer").value = questionparam.answer; // 답변내용
	getElementById("rgst_date").value = setDateTimeFormat(questionparam.rgstDate); // 등록일자
	getElementById("txtAnswerDate").value = setDateTimeFormat(questionparam.answerDate); // 답변일자
	getElementById("txtUserName").value = questionparam.userName; // 담당 상담원
	getElementById("txtCurState").value = questionparam.stateName; // 진행상태
	
	var bDisable = true;
	if(!isNull(questionparam) && questionparam.stateCd == "00") { // 배정대기 상태 일 경우 버튼 활성화
		bDisable = false;
	}
	
	disabledButton(bDisable, "btnDel"); // 삭제 버튼
	disabledButton(bDisable, "btnSave"); // 수정 버튼
}

// 문의작성 버튼 클릭
function fnLinkQus() {
	var width = 600;
	var height = 450;
	var left = (screen.width - width) / 2;
	var top = (screen.height - height) / 2;
	
	var option = "left=" + left;
		option += ", top=" + top;
		option += ", width=" + width;
		option += ", height=" + height;
	
	window.open("/custWrite/custQusWrite.html", "custQusWrite", option);
}

// 삭제 div 보여주기
function fnDelDivShow() {
	getElementById("divDelChkCust").style.display = "block"; // 삭제 div 보여주기
	
	getElementById("txtDelPwd").value = ""; // 비밀번호 초기화
}

// 삭제 div 숨기기
function fnCloseDelDiv() {
	getElementById("divDelChkCust").style.display = "none"; // 삭제 div 숨기기
}

// 수정 div 보여주기
function fnUpdDivShow() {
	getElementById("divUpdChkCust").style.display = "block"; // 수정 div 보여주기
	
	getElementById("txtUpdPwd").value = ""; // 비밀번호 초기화
	getElementById("txtUpdMemo").value = questionparam.memo; // 문의 내용 초기화
}

// 수정 div 숨기기
function fnCloseUpdDiv() {
	getElementById("divUpdChkCust").style.display = "none"; // 수정 div 숨기기
}

// 삭제 버튼 클릭
// 삭제 대상 문의에 배정 상담원이 있는지 체크
function fnDelQnaData() {
	
	if(isNull(questionparam.qstSeq)) {
		alert("선택 된 문의가 없습니다.");
		return;
	}
	
	var elmPwd = getElementById("txtDelPwd");
	var sPwd = elmPwd.value;
	
	if(isNull(sPwd)) {
		alert("비밀번호를 입력해주세요.");
		elmPwd.focus();
		return;
	} else if(sPwd != questionparam.pwd) {
		alert("비밀번호가 일치하지 않습니다.");
		elmPwd.focus();
		return;
	}
	
	if(!confirm("삭제하시겠습니까?")) {
		return;
	}
	
	xmlHttpRequest(TRAN_QNA_ID + "selectQnAInfo.do", "CHK_DEL_CRG_USR", questionparam, completeMain);
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

// 수정 버튼 클릭
function fnUpdQnaData() {
	
	var sMemo = getElementById("txtUpdMemo").value; // 문의내용
	
	var elmPwd = getElementById("txtUpdPwd");
	var sPwd = elmPwd.value; // 비밀번호
	
	if(isNull(sMemo)) {
		alert("문의내용을 입력해주세요.");
		getElementById("txtUpdPwd").focus();
		return;
	} else if(isNull(sPwd)) {
		alert("비밀번호를 입력해주세요.");
		elmPwd.focus();
		return;
	} else if(sPwd != questionparam.pwd) {
		alert("비밀번호가 일치하지 않습니다.");
		elmPwd.focus();
		return;
	}
	
	if(!confirm("수정하시겠습니까?")) {
		return;
	}
	
	questionparam.memo = sMemo; // 문의내용
	
	xmlHttpRequest(TRAN_QNA_ID + "selectQnAInfo.do", "CHK_UPD_CRG_USR", questionparam, completeMain);
}

function fnUpdate(param) {
	xmlHttpRequest(TRAN_QNA_ID + "updateQuestion.do", "UPDATE_QNA", param, completeMain);
}

// 실행 완료 후 콜백
function completeMain(callbackId, status, rqstParam, rspsResult) {
	if(status != 200) {
		alertErroMsg(rspsResult); // 에러 메시지 alert
		return;
	}
	
	if(callbackId == "GET_QNA_LIST") { // Q&A 리스트 조회 fnGetQnaLis
		if(!isNull(rspsResult)) {
			fnSetGridList(rspsResult); // 그리드 리스트 셋팅
		}
	}
	
	if(callbackId == "UPDATE_QNA") { // 저장 버튼 클릭 (수정) fnSaveQnaData
		alert("문의가 수정 되었습니다.");
		fnGetQnaList();
	}
	
	if(callbackId == "CHK_DEL_CRG_USR") { // 삭제 버튼 클릭, 삭제 대상 문의에 배정 상담원이 있는지 체크 fnDelQnaData
		if(isNull(rspsResult.userId)) {
			fnDelete(rqstParam);
		} else {
			alert("이미 배정 되었습니다.\n삭제가 불가능합니다.");
			fnGetQnaList();
		}
	}
	
	if(callbackId == "CHK_UPD_CRG_USR") { // 삭제 버튼 클릭, 삭제 대상 문의에 배정 상담원이 있는지 체크 fnDelQnaData
		if(isNull(rspsResult.userId)) {
			fnUpdate(rqstParam);
		} else {
			alert("이미 배정 되었습니다.\n내용 수정이 불가능합니다.");
			fnGetQnaList();
		}
	}
	
	if(callbackId == "DEL_QNA") { // 삭제 버튼 클릭 fnDelQnaData
		alert("삭제되었습니다.");
		fnGetQnaList();
	}
}