INSERT INTO CUSTOMER (CUST_ID, CUST_NAME, PWD, PWD_ANSWER, PWD_HINT, RGST_DATE, TRY_CNT) VALUES ('CUST1', '김철수', '1234', '1번', '저는 몇 번 입니까?', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), 0);
INSERT INTO CUSTOMER (CUST_ID, CUST_NAME, PWD, PWD_ANSWER, PWD_HINT, RGST_DATE, TRY_CNT) VALUES ('CUST2', '홍길동', '1234', '2번', '저는 몇 번 입니까?', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), 0);
INSERT INTO CUSTOMER (CUST_ID, CUST_NAME, PWD, PWD_ANSWER, PWD_HINT, RGST_DATE, TRY_CNT) VALUES ('CUST3', '이영수', '1234', '3번', '저는 몇 번 입니까?', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), 0);



INSERT INTO QUESTION_ANSWER (CUST_ID, CUST_NAME, PWD, TITLE, MEMO, RGST_DATE, USER_ID, CHRG_DATE, ANSWER, ANSWER_DATE) VALUES ('CUST1', '김철수', '1234', '안녕하세요?1번으로 문의합니다.',
'김철수 입니다. 문의가 있습니다.
답변 부탁드립니다.', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), 'AGENT1', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), null, null);
INSERT INTO QUESTION_ANSWER (CUST_ID, CUST_NAME, PWD, TITLE, MEMO, RGST_DATE, USER_ID, CHRG_DATE, ANSWER, ANSWER_DATE) VALUES ('CUST1', '김철수', '1234', '안녕하세요?2번으로 문의합니다.',
'또 다른 문의가 있습니다.
답변 부탁드립니다.', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), null, null, null, null);
INSERT INTO QUESTION_ANSWER (CUST_ID, CUST_NAME, PWD,TITLE, MEMO, RGST_DATE, USER_ID, CHRG_DATE, ANSWER, ANSWER_DATE) VALUES ('CUST2', '홍길동', '1234', '안녕하세요?1번으로 문의합니다.',
'홍길동 입니다. 문의가 있습니다.
답변 부탁드립니다.', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), 'AGENT1', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'),
'안녕하세요 홍길동 고객님.
상담원 라이언 입니다.
문의에 대한 답변드립니다. 답변이 도움이 되었으면 좋겠습니다.
해당 답변에 대한 다른 문의 발생 시 문의를 남겨주시면 성실히 답변해드리겠습니다.
상담원 라이언이었습니다. 감사합니다.', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'));
INSERT INTO QUESTION_ANSWER (CUST_ID, CUST_NAME, PWD, TITLE, MEMO, RGST_DATE, USER_ID, CHRG_DATE, ANSWER, ANSWER_DATE) VALUES ('CUST2', '홍길동', '1234', '안녕하세요?2번으로 문의합니다.',
'또 다른 문의가 있습니다.
답변 부탁드립니다.', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), null, null, null, null);
INSERT INTO QUESTION_ANSWER (CUST_ID, CUST_NAME, PWD, TITLE, MEMO, RGST_DATE, USER_ID, CHRG_DATE, ANSWER, ANSWER_DATE) VALUES ('CUST2', '홍길동', '1234', '안녕하세요?3번으로 문의합니다.', '답변은 언제쯤 달릴까요?', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), null, null, null, null);
INSERT INTO QUESTION_ANSWER (CUST_ID, CUST_NAME, PWD, TITLE, MEMO, RGST_DATE, USER_ID, CHRG_DATE, ANSWER, ANSWER_DATE) VALUES ('CUST2', '홍길동', '1234', '안녕하세요?4번으로 문의합니다.',
'마지막 문의가 있습니다.
답변 부탁드립니다.', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'), null, null, null, null);



INSERT INTO USER (USER_ID, USER_NAME, PWD, TRY_CNT, PWD_HINT, PWD_ANSWER, RGST_DATE) VALUES ('AGENT1', '라이언', '1234', 0, '몇 번 입니까?', '1번', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'));
INSERT INTO USER (USER_ID, USER_NAME, PWD, TRY_CNT, PWD_HINT, PWD_ANSWER, RGST_DATE) VALUES ('AGENT2', '어피치', '1234', 0, '몇 번 입니까?', '2번', TO_CHAR(SYSDATE,'yyyyMMddHH24MISS'));
