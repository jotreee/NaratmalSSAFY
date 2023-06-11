# 나랏말싸피

## 1. 서비스 개요

### 1.1 서비스 설명

개요

- 서비스 명 :나랏말싸피
- 한줄 소개: 자신만의 손글씨를 웹, 모바일, PC에서 사용 가능한 폰트로 변환하는 서비스

### 1.2 기획 배경

- 기본 유사한 서비스들은 폰트를 만들기 위해 5 ~ 300만원의 금액을 요구하며 기간이 최소 2주가 걸리는 방식을 이용하여 이를 개선 시키기 위한 프로젝트를 기획

- 싸피를 통해 배우고 프로젝트를 진행하며 정신없이 달려온 싸피생들에게 마지막 수료 선물로 오랫 동안 간직하며 싸피를 추억할 수 있는 선물을 제공하기 위해 프로젝트를 기획

## 2. 기술

### 2.1 기술 스택

- FrontEnd: React
- BackEnd: SpringBoot, JPA, SpringSecurity, JWT, MySQL, FastAPI, Node.js, S3
- Infra: AWS EC2, Docker, Jenkins, Nginx
- AI: JupyterNoteBook

### 2.2 아키텍쳐

![](https://velog.velcdn.com/images/kws04254/post/4b83dfcc-0d7a-4ea8-ae5a-fefafca6be8d/image.png)

### 2.3 폰트변환 플로우

![](https://velog.velcdn.com/images/kws04254/post/ead19172-b91f-4161-9d23-00f81274c5e3/image.gif)

- 사용자가 손글씨 이미지를 업로드 하고 폰트 제작 요청을 하면 손글씨 이미지는 API서버인 스프링부트로 전송
- 스프링부트는 손글씨 이미지를 공유폴더에 저장, fastAPI에 폰트 제작 요청

![](https://velog.velcdn.com/images/kws04254/post/7b3852bb-e8af-41ba-95a2-5577f138a0a6/image.gif)

- fastAPI에서 공유폴더에 저장된 11장의 손글씨 이미지를 바탕으로 약 2380장의 손글씨 이미지 생성
- 약 2380장의 이미지를 다시 공유폴더에 저장
- node.js에 폰트파일 제작 요청

![](https://velog.velcdn.com/images/kws04254/post/96e5ff34-d918-47e4-a7a9-4a1e3603a831/image.gif)

- node.js는 공유폴더에 저장된 2380장의 이미지를 벡터이미지로 변환
- 벡터 이미지를 바탕으로 .ttf .woff 파일 생성
- 공유폴더에 폰트파일 저장, 제작 완료 응답 반환

![](https://velog.velcdn.com/images/kws04254/post/33863c3a-7194-47d4-ad79-c457f2683444/image.gif)

- fastAPI는 공유폴더에 저장된 폰트파일 2개를 S3서버에 저장

### 2.4 AI모델 및 개선점

- ### 2.4-1 사용모델

  ![](https://velog.velcdn.com/images/kws04254/post/deb4dfba-e1ab-4655-8ddf-f8e835f5b651/image.png)
  HAN2HAN 모델을 기본적으로 사용(https://github.com/MINED30/HAN2HAN)

- ### 2.4-2 EarlyStop
  ![](https://velog.velcdn.com/images/kws04254/post/7126c44a-4d2f-4eba-a0a4-54188b799bde/image.png)

FineTuning시 과적합 방지를 위해 EarlyStop 도입

- ### 2.4-3 결과 후처리 - 구멍난 글씨
  ![](https://velog.velcdn.com/images/kws04254/post/2bb1bf2d-69de-433c-a3a7-7611894690ea/image.png)

![](https://velog.velcdn.com/images/kws04254/post/a8d0701e-3308-4598-8aec-1198cb3be027/image.png)

처음 만들어지는 2402자의 글자 이미지는 배열 형태. 이를 이미지로 저장하기 위해 uint형으로 변경하면 underflow발생으로 글자에 흰 구멍이 생김

0~255의 정수만 표현할 수 있는 uint에 음수가 들어가며 발생한 현상. 배열을 형변환하기 전에 절댓값을 씌우며 해결

- ### 2.4-4 이미지 전처리 - 배경 구분

![](https://velog.velcdn.com/images/kws04254/post/3517e8db-cb1c-412b-baf8-027f59c07ac1/image.png)

글자가 연하거나 배경이 어두우면 인식을 못하는 현상.

특정 값을 기준으로 어두우면 글자 밝으면 배경으로 처리해서 발생한 문제.

입력 이미지의 평균값을 기준으로 두어 해결

- ### 2.4-5 결과 후처리 - 색 보정

![](https://velog.velcdn.com/images/kws04254/post/5bd012cc-de72-4eaf-8e41-59c522af6918/image.png)

글자가 흐릿한 현상.

일정 이상 어두우면 완전 검정, 일정 이상 밝으면 완전 흰색, 나머지는 좀 더 어둡게 처리하여 또렷해짐

---

## 3. 서비스 화면

### 3.1 메인페이지

![](https://velog.velcdn.com/images/kws04254/post/ede56658-ab66-47bb-9932-f65e35f1b120/image.JPG)

### 3.2 폰트제작

프로젝트의 메인 기능으로써 손글씨 이미지를 업로드하여 웹, 모바일에서 사용가능한 폰트를 만듦

- ### 3.2-1 제작방법 안내

![](https://velog.velcdn.com/images/kws04254/post/e52868bb-e123-4156-8de7-9d283c1e5eeb/image.gif)

폰트를 만들기 위해 필요한 전반적인 준비물과 주의사항을 알려줌. 손글씨 작성 요령과 실제 사진을 준비하는 단계

- ### 3.2-2 손글씨 이미지 업로드

![](https://velog.velcdn.com/images/kws04254/post/229e196c-743e-4df9-a913-82f383c19db3/image.gif)

선택한 사진에서 폰트화 하기에 필요한 글을 하나씩 추출

- ### 3.2-3 이미지 확인

![](https://velog.velcdn.com/images/kws04254/post/b6fe0214-40bc-442a-95d2-9b7100d01758/image.gif)

추출한 글자 이미지를 확인

- ### 3.2-4 폰트 정보 입력

![](https://velog.velcdn.com/images/kws04254/post/56e2f047-e504-4384-8fa3-72aa52eda4b1/image.gif)

폰트의 이름과 한줄소개를 작성 후 제작 신청

### 3.3 마이페이지

자신의 폰트, 즐겨찾기, 다운로드한 폰트를 확인하며 회원정보를 수정함

- ### 3.3-1 폰트 확인

![](https://velog.velcdn.com/images/kws04254/post/339dcb52-7fd0-496b-a107-71576562f704/image.gif)

폰트의 제작 상황을 받아 볼 수 있으며 체험하며 즐겨찾기, 다운로드한 폰트를 확인 가능

- ### 3.3-2 정보 수정

![](https://velog.velcdn.com/images/kws04254/post/27912eee-d002-4cc1-a945-29a2477a64d2/image.gif)

회원의 지역, 이름, 닉네임을 수정할 수 있음

### 3.4 폰트 검색

자신의 폰트와 다른사람들의 폰트를 검색하며 간이체험 가능

- ### 3.4-1 검색

![](https://velog.velcdn.com/images/kws04254/post/1bf52e83-8e73-4406-8fa3-c64d276eeab5/image.gif)

원하는 폰트를 닉네임과 폰트이름의 두 가지 주제로 검색

- ### 3.4-2 정렬

![](https://velog.velcdn.com/images/kws04254/post/2ec7cdf5-6d06-402f-9e75-f692f58b828a/image.gif)

폰트 리스트를 최신순, 날짜순, 인기순, 다운로드순으로 나열할 수 있음

- ### 3.4-3 간이체험

![](https://velog.velcdn.com/images/kws04254/post/a0011c4e-6b4f-4ccb-927c-e14b2a09fd72/image.gif)

각각의 카드에 내용을 바꿔 폰트 확인 가능, 공통 입력창을 이용해 전체 카드 내용을 수정 가능

### 3.5 체험

폰트의 상세정보를 열람하며 마음에 드는 폰트는 즐겨찾기, 다운로드, 카카오톡 공유 가능, 폰트를 다양하게 체험 가능

- ### 3.5-1 폰트 상세정보

![](https://velog.velcdn.com/images/kws04254/post/f6ff1f14-53ef-49aa-80ef-2489396ec048/image.gif)

폰트 이름, 제작일, 한줄소개, 제작자 등 여러가지 정보를 열람가능
폰트 제작자는 한줄소개를 수정가능

- ### 3.5-2 폰트 체험

![](https://velog.velcdn.com/images/kws04254/post/f1426532-3b33-4048-b37e-ae01582c7ba8/image.gif)

![](https://velog.velcdn.com/images/kws04254/post/99e1eadf-868a-4214-b1b1-5821092641cc/image.gif)

다양한 편지지를 선택하여 그 위에 적용된 폰트로 글을 작성 할 수 있음. 글의 색상, 크기, 자간, 행간을 조정하며 글 작성

- ### 3.5-3 폰트 즐겨찾기 및 다운로드

![](https://velog.velcdn.com/images/kws04254/post/f606bb2e-7ff1-4024-9266-589d86b0828b/image.gif)

마음에 드는 폰트 즐겨찾기 표시 및 다운로드 가능

- ### 3.5-4 카카오톡 공유

![](https://velog.velcdn.com/images/kws04254/post/81b9db8b-159a-4c50-9f2f-81349a4ad094/image.gif)

카카오톡 공유를 통해 다른 사람과 공유 가능

### 3.6 낙서장

자신의 손글씨 폰트로 각 지역의 낙서장에서 추억 공유

- ### 3.6-1 지역 선택

![](https://velog.velcdn.com/images/kws04254/post/e5d2a147-8cd1-47a7-9e13-cbdeda81e9ee/image.gif)

서울, 대전, 구미, 광주, 부울경 각 캠퍼스만의 낙서장을 선택

- ### 3.6-2 낙서 작성
  ![](https://velog.velcdn.com/images/kws04254/post/c8c09e6c-1543-4841-88c4-2c48a1dadedb/image.gif)

제목, 내용, 폰트선택, 색상선택 을 통해 낙서를 작성, 지역 모든 교육생들과 추억 공유

### 3.7 폰트파일 활용

- ### 3.7.1 PPT 활용
  ![](https://velog.velcdn.com/images/kws04254/post/b4b21c9c-b2b1-4109-bd00-9fc9484e49a3/image.png)
- ### 3.7.2 스마트폰 활용
  ![](https://velog.velcdn.com/images/kws04254/post/b50af737-3eb3-43b9-bd1c-98be221d7994/image.gif)

---

## 4. 개발문서

### 4.1 ERD

![](https://velog.velcdn.com/images/kws04254/post/857e2540-81b4-4165-b585-a0f2be6b8548/image.png)

### 4.2 API 명세서

![](https://velog.velcdn.com/images/kws04254/post/e5b61b8b-429f-4f3e-8b6e-94552384da3e/image.png)

### 4.3 Git

- Git 사용모습
  ![](https://velog.velcdn.com/images/kws04254/post/ba784edc-cced-4215-a615-c7de74bf511c/image.gif)

- branch 생성 규칙
  ![](https://velog.velcdn.com/images/kws04254/post/26bb6a38-75c1-4b99-94ab-5a35af248b4f/image.png)

- commit 규칙
  ![](https://velog.velcdn.com/images/kws04254/post/10daaa35-4fbd-46ef-9728-9856becc2fe4/image.png)

### 4.4 Jira

- Jira 이슈내역

![](https://velog.velcdn.com/images/kws04254/post/14116778-4cd2-4787-904e-1ea5d2708e8c/image.gif)

- Jira 이슈관리 규칙
  ![](https://velog.velcdn.com/images/kws04254/post/7d7283cf-9f54-45be-b84b-0fd890f61261/image.png)

---

## 5. [배포문서](./exec/%EB%82%98%EB%9E%8F%EB%A7%90%EC%8B%B8%ED%94%BC%20%ED%8F%AC%ED%8C%85%20%EB%A7%A4%EB%89%B4%EC%96%BC.pdf)

---

## 6. 영상링크

- [UCC](https://youtu.be/MdQykeiUtCs)
- [메인페이지 영상 ](https://youtu.be/ZN1e5uO_Yp0)
