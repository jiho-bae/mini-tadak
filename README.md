# 미니타닥!!

### 🔥 미니 타닥???

> [타닥타닥](https://github.com/boostcampwm-2021/web15-TadakTadak) 의 간소화 버전입니다.

- 기존 프로젝트의 복습을 위한 프로젝트입니다.
- 기존 프론트 코드 재활용도 하면서 새 기술들을 적용해 볼 예정입니다.
- 타닥타닥 프로젝트 서버 코드를 로컬에서 이용하여 개발합니다.

### 🔥 기술 스택

- JS - React, TypeScript
- CSS - [AdorableCSS](https://www.npmjs.com/package/adorable-css)
- 실시간통신 - [Agora](https://www.agora.io/en/), socket.io
- 이외에도 적용할 기술이 추가될 수 있습니다.

### 몇가지 고민의 흔적

- [인증 방식 개선 - refresh token 도입하기](https://tar-keyboard-2bc.notion.site/JWT-596bf75945f64a46b5b6fd01fc640c98)
- [사이드바 채팅창 스크롤 관리하기](https://gobae.tistory.com/147)

### 각 페이지 소개

#### 🦀 로그인 페이지

<img width="800" alt="image" src="https://user-images.githubusercontent.com/67041709/183837840-16f33b2d-ac56-4add-9cc0-ec7effceecc0.png">

- `아이디 / 비밀번호` 로그인
- 로그인 요청시 기존 서버에서 요구하는 `email / password` 형식에 맞게 변환 후 요청

#### 🦀 회원가입 페이지

<img width="800" alt="image" src="https://user-images.githubusercontent.com/67041709/183845169-cb111aab-7249-4bcc-bc2f-c8c29c2ede7e.png">

- `아이디 / 비밀번호` 회원가입
- 회원가입 요청시 기존 서버에서 요구하는 `email / nickname / password / devField` 형식에 맞게 변환 후 요청

#### 🦀 메인 페이지

<div style="display:flex">
  <img style="margin-right:10px" width="400" alt="image" src="https://user-images.githubusercontent.com/67041709/185920660-1a9c3f38-2afc-4804-aff6-c4332254166d.png">
  <img width="400" alt="image" src="https://user-images.githubusercontent.com/67041709/185921071-13b81221-b82a-4c53-8b7f-8b29ad9c98f8.png">
</div>

- 기본 방 목록 15개. 스크롤 위치 기반 새로운 방 목록 요청
- 검색 기능 0.5초 디바운스 적용(키보드 입력 종료후 0.5초 후에 검색)
- 방 목록 클릭시 방 입장 가능

<div style="display:flex">
    <img style="margin-right:10px" width="400" alt="image" src="https://user-images.githubusercontent.com/67041709/185922171-f8414822-a731-4d99-b42e-69fece53be58.png">
    <img width="400" alt="image" src="https://user-images.githubusercontent.com/67041709/185922503-43074643-3a4f-4b0d-bcce-3a5fc9066fbc.png">
</div>

- 헤더 - 방만들기로 최대 1개의 방 개설 가능
- 자동으로 개설한 방으로 이동. 영상/음성 통신 가능

#### 🦀 페이지 추가 예정

comming soon.......... 🙂🙂🙂🙂🙂🙂🙂

### ☠️ 프로젝트를 통해 맛 볼 기술

- ✅ 기존 jwt 방식에 refresh token 추가 도입
- 함수형 프로그래밍 및 선언형 프로그래밍 맛보기
- ✅ adorable css (functional css)
- ✅ event delegation
- ✅ intersection observer
- ⏳ state management library
- suspense + errorboundary
- 이외에 추가될 수 있습니다.
