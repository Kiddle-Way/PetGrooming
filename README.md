# 프로젝트 소개
<div align=center>
  <img src="PetGrooming-Frontend/src/image/logo12.jpg" />
</div>

---
<br>

> 코로나 이후 현대 사회는 반려동물 보유 가구 수의 비율이 폭발적으로 증가했고, 반려동물 미용 업체의 수도 전국적으로 매년 증가하는 추세입니다.
> 펫구루밍(petgrooming)은 점점 높아지는 반려동물 위생 및 미용 관심도를 기반으로 시작한 프로젝트입니다.
>
> 해당 서비스에서 사용자는 필요한 정보를 제공하고 원하는 상품을 예약할 수 있으며, 관리자는 쉽게 직원, 상품, 예약을 관리할 수 있으며 매출 통계를 통해 매장을 효율적으로 관리할 수 있는 예약 웹 서비스입니다.

### Features
>* 사용자는 다양한 상품을 한 눈에 보고 비교하여 쉽게 예약 가능
>* 관리자는 상품 및 예약, 매출을 손 쉽게 관리 가능
>* 일관적이며 직관적인 UI를 통해 사용자와 관리자에게 쉡고 빠른 서비스를 제공

 ### Develope
> 👉 [Front-end](https://github.com/Kiddle-Way/PetGrooming/tree/main/PetGrooming-Frontend)<br>
> 👉 [Back-end](https://github.com/Kiddle-Way/PetGrooming/tree/main/PetGrooming-Backend)
> 
> 📆 개발 기간<br>
> 2024-02-20 ~ 2024-04-10
<br>

## 👨‍👨‍👦‍👦팀원
> 팀장 : <a href="">김호중</a><br>
> 팀원 : <a href="https://github.com/ssunmyung97">김선명</a>, <a href="https://github.com/stars8781">김성진</a>, <a href="https://github.com/sunshine149">이경원</a>, 황지은
<br>

## 📝ERD
![그림1](https://github.com/Kiddle-Way/PetGrooming/assets/153166162/b3b7398f-8831-42c4-b266-ea87dc5f5da2)
<br>

## ⚙기술 스택
### Backend
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/JPA-83B81A?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white"> <img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">

### Frontend
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/daisy ui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white">
<br>

## 💡주요 기능
### [사용자] 예약 및 결제
![예약하기](https://github.com/Kiddle-Way/PetGrooming/assets/153166162/d95824b8-416e-4d4a-8b67-ef0133187a0b)
* 디자이너 선택 -> 예약 정보 입력 -> 날짜 및 시간, 상품과 무게 선택 -> 결제 -> 예약 완료
* 토스페이먼츠 API를 사용한 결제 기능
<br>

### [사용자] 리뷰 작성 및 조회
![리뷰](https://github.com/Kiddle-Way/PetGrooming-Frontend/assets/153166162/ed0e61c8-70b0-42b2-b8e9-29ce19f64854)

* 리뷰 작성 시 별점 및 사진 첨부, 비밀번호 설정 가능
* 리뷰 수정 삭제 가능
<br>

### [사용자] 마이페이지
![내 정보 수정](https://github.com/Kiddle-Way/PetGrooming-Frontend/assets/153166162/ea31afe3-3075-470a-852c-9599c45844ab)
![예약취소](https://github.com/Kiddle-Way/PetGrooming-Frontend/assets/153166162/2ee2a65a-11f5-4236-80c2-eda746bb63c6)

* 정보 수정 가능
* 예약 내역 조회 및 예약 취소 가능
<br>

---
### [관리자] 예약 관리
![예약관리](https://github.com/Kiddle-Way/PetGrooming-Frontend/assets/153166162/8c677476-2000-449b-a3ad-8186328102e9)

* 현재 예약 현황 조회 및 최소 승인 가능
* 지난 예약 목록 및 최소된 예약 목록 조회 가능
<br>

### [관리자] 상품 관리
![상품](https://github.com/Kiddle-Way/PetGrooming-Frontend/assets/153166162/bbeb53da-c4af-470f-bd01-4962864efcf4)
* 상품 등록 및 수정, 삭제 가능
<br>

### [관리자] 디자이너 관리
![디자이너](https://github.com/Kiddle-Way/PetGrooming/assets/153166162/18a4788d-e1ee-4642-9e1f-71abde43f16a)
* 디자이너 등록 시 사진 첨부 가능
* 수정, 삭제 가능
<br>

### [관리자] 공지사항 관리
![공지사항 고나리](https://github.com/Kiddle-Way/PetGrooming/assets/153166162/a6577f10-10bc-4298-84bb-a76070ad4828)
* 공지사항 등록 시 사진 첨부 가능
* 수정, 삭제 가능
<br>

### [관리자] 문의 답변
![답변](https://github.com/Kiddle-Way/PetGrooming/assets/153166162/ef495702-9037-4cd2-bc21-96c9fbc38329)
* 문의 게시판 답변 등록 가능
<br>

### [관리자] 통계
![통꼐](https://github.com/Kiddle-Way/PetGrooming/assets/153166162/8ce7e35a-3ef8-4a0e-9255-a3cae9fd94c9)
* 매출, 예약 건수, 상품별 예약 비율, 견종별 예약 비율 조회 가능
<br>

### 📂형상 관리
<table>
  <tr>
    <th>
    <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
    </th>
  </tr>
  <tr>
    <td align="center">
    프로젝트 일정관리, 문서관리, 미팅 로그, 등 프로젝트에 필요한 전반적인 사항 기록  
    </td>
  </tr>
  <tr>
    <td>
      <div align="center">
    <img src="https://github.com/Kiddle-Way/PetGrooming/assets/153166162/e0a58eb7-0b99-4fa9-8650-aca76905bfb4" />
    <img src="https://github.com/Kiddle-Way/PetGrooming/assets/153166162/f2c3da8e-452d-45b1-8cf2-f1e0ffdb8c23" />
    </td>
      </div>
  </tr>
</table>

<table>
  <tr>
     <th>
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
    </th>
  </tr>
  <tr>
    <td align="center">
    백엔드와 프론트엔드 레파지토리를 개별적으로 만들고 기능 구현 시 병합하여 관리
    </td>
  </tr>
  <tr>
     <td>
       <div align="center">
    <img  src="https://github.com/Kiddle-Way/PetGrooming/assets/153166162/0573a47a-4d63-4498-a321-070c82c5f41c" />
    <img  src="https://github.com/Kiddle-Way/PetGrooming/assets/153166162/63ede82a-b049-42a7-8129-90d821437f6a" />
       </div>
    </td>
  </tr>
</table>
