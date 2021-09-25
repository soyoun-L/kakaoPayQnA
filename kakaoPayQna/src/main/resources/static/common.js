/*********************************************************************************
* common.js
* 공통 스크립트
*
*********************************************************************************/
var TRAN_CUST_ID = "customer/"; // 고객 관련 데이터 거래 요청용
var TRAN_USR_ID = "user/"; // 상담원 관련 데이터 거래 요청용
var TRAN_QNA_ID = "qna/"; // Q&A 관련 데이터 거래 요청용

// 문의 리스트 컬럼 정보
var columns = [["no","text"]
			, ["stateName","text"]
			, ["title","text"]
			, ["userName","text"]
			, ["answerDate","date"]
			, ["rgstDate","date"]];
			
// 거래 요청 Q&A 파라미턴
var questionparam = {
	"qstSeq": null,
	"custId": null,
	"custName": null,
	"pwd":null,
	"title": null,
	"memo": null,
	"userId": null,
	"userName": null,
	"chrgDate": null,
	"answer": null,
	"answerDate": null,
	"rgstDate": null,
	"stateCd": null,
	"stateName": null
}

// Q&A 파라미터 초기화
function fnInitQnAParam() {
	questionparam.qstSeq = null;
	questionparam.custId = null;
	questionparam.custName = null;
	questionparam.pwd=null;
	questionparam.title = null;
	questionparam.memo = null;
	questionparam.userId = null;
	questionparam.userName = null;
	questionparam.chrgDate = null;
	questionparam.answer = null;
	questionparam.answerDate = null;
	questionparam.rgstDate = null;
	questionparam.stateCd = null;
	questionparam.stateName = null;
}

// 아이디로 element 가져오기
function getElementById(elmId) {
	return document.getElementById(elmId);
}

// 널체크
// return : true - null / false - is not null
function isNull(value) {
	if(value == null || value.length == 0) {
		return true;
	}
	
	for(var i = 0; i < value.length; i++ ) {
		if (value[i] == null || typeof (value[i]) == "undefined") {
			return true;
		} else {
			return false;
		}
	}
	
	return false;
}

// 시간 데이터 셋팅
// pDateTime : YYYYMMDD or YYYYMMDDHH24MISS
// return : YYYY-MM-DD or YYYY-MM-DD HH-MM-SS
function setDateTimeFormat(pDateTime) {
	var sFormatDate = pDateTime;
	if(!isNull(pDateTime) && (pDateTime.length == 8 || pDateTime.length == 14)) {
		sFormatDate = pDateTime.substr(0, 4) + "-";
		sFormatDate += pDateTime.substr(4, 2) + "-";
		sFormatDate += pDateTime.substr(6, 2);
		
		if(pDateTime.length == 14) {
			sFormatDate += " " + pDateTime.substr(8, 2) + ":";
			sFormatDate += pDateTime.substr(10, 2) + ":";
			sFormatDate += pDateTime.substr(12, 2);
		}
	}
	
	return sFormatDate;
}

// 객체 활성/비활성화
// bDisable : true - 비활성화 / false - 활성화, elmId : 객체 아이디
function disabledButton(bDisable, elmId) {
	if(bDisable) { // 비활성화
		getElementById(elmId).setAttribute("disabled", "disabled");
	} else { // 활성화
		getElementById(elmId).removeAttribute("disabled");
	}
}

// 그리드 클릭 row 표시
function fnClickListRow(tblElmId, idx) {
	var sColor = "white";
	var trList = getElementById(tblElmId).getElementsByTagName("tr");
	for(var i = 0; i < trList.length; i++) {
		if(i == idx) { // 현재 선택 한 row의 정보 일 경우 노란색 표기
			sColor = "yellow";
		} else {
			sColor = "white";
		}
		trList[i].style.background = sColor;
	}
}

// 에러 메시지 alert
function alertErroMsg(rspsResult) {
	var errMsg = "오류가 발생했습니다.\n관리자에게 문의해주세요.";
		errMsg += "\n\n에러코드 [" + rspsResult.status + "] :: " + rspsResult.error;
		errMsg += "\n" + rspsResult.message;
		
	alert(errMsg);
}

// 거래 요청
// url : 경로, callbackId : 거래ID, rqstParam : 요청 파라미터, callback : 콜백 함수
function xmlHttpRequest(url, callbackId, rqstParam, callback) {
   var sendData = null;
   
   if(rqstParam != null) {
      if(typeof rqstParam == "object") {
         sendData = JSON.stringify(rqstParam);
      } else {
         sendData = rqstParam;
      }
   }
   var xhr = new XMLHttpRequest();
   xhr.open("POST", "http://localhost:8080/" + url, true);
   xhr.responseType = "json";
   xhr.onload = function () {
      callback(callbackId, this.status, rqstParam, this.response);
   };
   
   xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
   xhr.send(sendData);
}