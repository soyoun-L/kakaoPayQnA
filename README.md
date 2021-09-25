# kakaoPayQnA
>카카오페이 워크플랫폼팀 플랫폼 개발자 사전과제(Q&amp;A)
1. 고객 문의 등록
2. 상담사 문의 조회 (답변되지 않은 문의 목록 10초 마다 조회)
3. 상담사 문의 지정
4. 지정 문의 답변
5. 고객 문의 답변 확인

>페이지 구성
1. 고객 사용 페이지
- 고객 로그인
- 문의 목록 조회
- 문의 작성

2. 상담사 사용 페이지
- 상담사 로그인
- 미답변 목록 조회
- 답변 목록 조회
- 답변 작성

* [Q&A(고객로그인 없이 문의 등록) 테스트 영상보기](https://www.loom.com/share/ce2ace64c6e94132a230e075481f1a47)
* [Q&A(고객로그인 후 문의 등록) 테스트 영상보기테스트 영상보기](https://www.loom.com/share/e7dafc861548423686c0250f8d36d464?sharedAppSource=personal_library)

## 개발환경
- Spring Tools 4 for Eclipse
- Spring boot version 2.5.4
- java 8
- H2 Database
- Spring Data JPA
- MyBatis Framework
- Strping Web
- JavaScript
- encording : UTF-8

```bash
kakaoPayQna
└ src/main
        └ java/com.kakaoPay.qna                 #back-end관련 소스 (엔티티 생성, dto, dao, repository 등)
        └ resources
                  └ mybatis-mapper              #마이바티스 쿼리
                  └ static
                         └ customer             #고객웹페이지(로그인버전) (html, js)
                         
                         └ custQus              #고객문의조회 웹페이지(미로그인버전) (html, js)
                         └ custWrite            #고객문의등록 팝업 웹페이지(미로그인버전) (html, js)
                         
                         └ user                 #상담원웹페이지 (html, js)
                         
                         application.properties #h2, jpa, mybatis 설정
                         common.js              #공통스크립트
```

## 실행방법
1. [Spring Toll Suite 4 실행](https://download.springsource.com/release/STS4/4.12.0.RELEASE/dist/e4.21/spring-tool-suite-4-4.12.0.RELEASE-e4.21.0-win32.win32.x86_64.self-extracting.jar)
2. Git Repository 연결(Clone a Git repository)
* URI : https://github.com/soyoun-L/kakaoPayQnA.git
* HOST : github.com
* PATH : /soyoun-L/kakaoPayQnA.git
* USER : 본인계정
* PASSWORD : 본인생성토큰
3. Working Tree > kakaoPayQna 우클릭 > Import Projects...
* ※Gradle 프로젝트이기 때문에 Detect and configure project natures 체크 해제
4. Package Explorer > kakaoPayQna 우클릭 > Configure > Add Gradle Nature
5. Package Explorer > kakaoPayQna 우클릭 > Properties > Resource > Text file encoding UTF-8
6. Run As Spring Boot App (run KakaoPayQnaApplication)

## 문제 해결 전략
> 환경 구성
- JPA Entity로 테이블 생성
- 마이바티스를 이용하여 필요한 쿼리를 손쉽게 구성
- 고객, 사용자 관련 UI, 스크립트 분리
- 업무 단위로 스크립트 분리(로그인, 비밀번호 찾기, 가입, 메인)
- 공통으로 사용되는 스크립트는 공통 스크립트로 분리
- UI 컨트롤은 자바스크립트로 동적 컨트롤 할 수 있도록 구현
- 고객문의 화면을 미로그인 버전과 로그인 버전으로 2가지 구성

>고객 문의 접수 화면(미로그인 버전)
- 고객 문의 조회 (조회, 수정, 삭제) 화면, 고객 문의 등록 팝업 화면으로 구성
- 고객 문의 조회는 고객 아이디, 고객명, 상태 조회 조건으로 조회 가능
- 문의 ROW 클릭 시 우측 문의 상세 정보 항목에 맞춰 내용 표기
- 배정대기 상태 일 경우 삭제, 수정 가능 하도록 구성
- 답변대기, 답변완료 상태 일 경우 삭제, 수정이 불가능 하도록 구성
- 삭제, 수정은 문의 작성 시 입력한 비밀번호를 입력해야 삭제, 수정 가능
- 문의작성 버튼 클릭 시 고객 문의 작성 팝업이 뜸
- 고객 문의 작성 팝업에서 내용 입력 후 등록 처리 시 팝업이 닫히면서 고객 문의 리스트가 재조회 될 수 있도록 구성

>고객 문의 접수 화면(로그인 버전)
- 사용자 편의를 위한 문의 목록 조회와 문의 작성을 한눈에 볼 수 있도록 구성
- 상단에 고객 기본 정보와 접수한 문의 건수를 볼 수 있게 구성
- 문의에 대한 상태(배정대기, 답변대기, 답변완료) 표시로 현재 나의 문의에 대한 상황을 파악 할 수 있게 구성
- 문의 ROW 클릭 시 우측 문의 상세 정보 항목에 맞춰 내용 표기
- 신규 버튼 클릭 시 신규로 내용 작성 할 수 있도록 문의 작성 DIV 초기화
- 상담원 배정이 안된 문의는 제목, 내용을 수정 및 문의 삭제 할 수 있도록 구성
- 상담원 배정 된 문의는 수정 및 삭제 할 수 없도록 구성

>상담원 문의 답변 화면
- 사용자 편의를 위한 미 배정 문의 리스트, 배정된 문의 리스트(미답변 문의(기간상관없이) & 당일 배정 문의), 답변 작성을 하나의 페이지에 한눈에 볼 수 있도록 구성
- 상단에 상담원 기본 정보와 금일 배정된 문의 건수, 금일 배정된 문의 건수 중 답변 건수, 금일 배정된 문의 건수 중 미답변 건수를 볼 수 있게 구성
- 로그인 후 답변이 안달린 문의 리스트를 10초 단위로 자동 조회 할 수 있도록 구성
- 자동조회, 수동조회 버튼을 배치해 10초 자동 조회 또는 수동으로 버튼 클릭 시 조회 할 수 있도록 구성
- 미 배정 문의 리스트 ROW에 배정 버튼을 두어 상담원 배정을 할 수 있도록 구성
- 배정된 문의 리스트는 문의에 대한 상태(배정대기, 답변대기, 답변완료) 표시로 답변이 필요한 문의를 파악 할 수 있도록 구성(미답변 문의 최상위 정렬)
- 배정된 문의 리스트 ROW클릭 시 우측 문의 상세 정보 항목에 맞춰 내용 표기
- 답변대기 상태인 문의는 답변 내용을 입력 하고 저장 할 수 있도록 구성
- 답변완료 상태인 문의는 답변 내용을 입력 할 수 없도록 구성

## 개선사항
>추후 시간이 더 주어졌을 경우 개선이 필요하다고 생각되는 구성들
- 비밀번호에 대한 암호화 처리
- 문의에 대한 상세 카테고리 분류
- 상담원 문의 답변 리스트의 조회 기간을 두고 이력성으로 조회 할 수 있도록 구성
- 상담원 문의 처리에 대한 순위 표기
