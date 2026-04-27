# Brain Dump — ADHD 플래너

> 머릿속을 비우세요. AI가 정리해 줄게요.

ADHD를 위한 모바일 친화적 플래너 PWA. 떠오르는 생각을 즉시 적으면 AI가 자동으로 카테고리(오늘 할 일 / 일정 / 언젠가 / 메모)로 분류해 정리합니다.

## 주요 기능

- **빠른 입력** — 채팅하듯이 생각을 적으면 자동 분류
- **자동 카테고리화** — OpenAI API로 오늘/일정/언젠가/메모 분류
- **두 가지 뷰**
  - 팝업 뷰: 채팅 버블 형태의 미니멀한 인터페이스
  - 대시보드 뷰: 카테고리별 한눈에 보기
- **주간 플래너** — 요일×시간 그리드에 시간 블록을 드래그/드롭으로 배치, 주간 목표 5개 + 카테고리 관리
- **주간 회고** — 한 주를 돌아보고 기록(주간 플래너에 함께 저장)
- **고정(Pin) 메모** — 중요한 메모를 헤더에 고정
- **완료 처리** — 체크 한 번으로 처리, 줄 긋기 표시
- **Google 로그인** — Firebase Authentication
- **클라우드 동기화** — Firestore 실시간 저장
- **PWA** — 모바일/데스크톱 홈 화면에 설치 가능, 오프라인 지원

## 버전

v12

## 기술 스택

- HTML / CSS / Vanilla JavaScript
- Firebase (Authentication + Firestore)
- OpenAI API (GPT 분류)
- Service Worker (오프라인 캐싱)
- PWA (Web App Manifest)

## 파일 구성

```
planner4me/
├── index.html       # 앱 본체 (UI + 로직)
├── manifest.json    # PWA 설정
├── sw.js            # Service Worker (오프라인/캐싱)
├── icon-192.png     # 앱 아이콘 (192x192)
└── icon-512.png     # 앱 아이콘 (512x512)
```

## 실행

`index.html`을 브라우저로 열거나, 정적 호스팅(Firebase Hosting, Netlify, Vercel 등)에 배포해 사용합니다.
