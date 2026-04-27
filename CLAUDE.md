# Brain Dump (planner4me) — Claude 가이드

> 이 파일은 클로드가 이 프로젝트에서 작업을 시작할 때 가장 먼저 읽는 메모입니다.
> PC / 웹(claude.ai/code) / 모바일 어디서든 자동으로 컨텍스트가 잡힙니다.

## 프로젝트 개요

- **이름**: Brain Dump — ADHD 플래너
- **버전**: v12
- **유형**: PWA (Progressive Web App), 정적 웹앱
- **UI 언어**: 한국어
- **타겟**: 모바일 우선 (데스크톱도 지원)
- **사용자**: ADHD 성향 — 떠오르는 생각을 즉시 적으면 AI가 자동 분류

## 기술 스택

- **프론트엔드**: HTML / CSS / Vanilla JavaScript (프레임워크 없음, 빌드 단계 없음)
- **데이터베이스**: Firebase Firestore (실시간 클라우드 동기화)
- **인증**: Firebase Authentication (Google 로그인)
- **AI**: OpenAI API (입력 텍스트 자동 카테고리 분류)
- **오프라인 지원**: Service Worker
- **백엔드**: 없음 (서버리스, 정적 호스팅으로 동작)

## 파일 구조

```
planner4me/
├── index.html       # 앱 본체 — UI + 로직이 모두 이 한 파일에 있음
├── manifest.json    # PWA 설정 (앱 이름, 아이콘, 색상)
├── sw.js            # Service Worker (오프라인 캐싱)
├── icon-192.png     # 앱 아이콘 (PWA 설치용)
├── icon-512.png     # 앱 아이콘 (PWA 설치용)
├── README.md        # 프로젝트 소개
└── CLAUDE.md        # 이 파일
```

## 핵심 도메인 개념

- **카테고리 4종**: `오늘 할 일` / `일정` / `언젠가` / `메모`
- **완료(done) 상태**: 카테고리와 별개. 체크하면 줄 긋기 + 흐림 처리
- **고정(Pin)**: 중요한 메모 1개를 헤더에 항상 노출
- **두 가지 뷰 모드**:
  - `mode-popup`: 채팅 버블 형태 (기본 모드)
  - `mode-dash`: 대시보드 — 카테고리별로 한눈에 보기
- **iOS/Apple 디자인 언어**: System Blue `#007AFF`, SF Pro 폰트, 라운드 코너

## ⚠️ 중요 제약사항 (반드시 준수)

### 1) Private repo 유지 — Public 전환 금지

`index.html` 안에 **Firebase 설정 키와 OpenAI API 키가 평문으로 들어있습니다.**
공개되면 제3자가 데이터베이스에 접근하거나 OpenAI 크레딧을 소진시킬 수 있습니다.
- 절대 Public으로 변경 금지
- 키를 별도 환경변수로 빼는 작업은 백엔드를 도입해야 가능 — 사용자 명시 요청 시에만

### 2) 단일 파일 아키텍처 유지

**사용자는 비개발자입니다.** 다음을 임의로 추가하지 마세요:
- 빌드 도구 (webpack, vite, rollup 등)
- 프레임워크 (React, Vue 등)
- 패키지 매니저 (npm, yarn 등)
- 외부 파일 분리 (.css, .js 분리) — 사용자가 명시적으로 요청하기 전까지 금지

`index.html` 하나 열면 바로 동작하는 구조를 유지하세요. CDN 스크립트는 OK.

### 3) Service Worker 캐시 버전 관리

`sw.js` 상단의 `CACHE_NAME = 'braindump-v1'`:
- 정적 파일 구조(파일 추가/삭제, 이름 변경)나 HTML/CSS/JS의 **사용자가 체감할 만한 변경**이 있으면 → **버전을 올려야 함** (v1 → v2 → v3...)
- 안 올리면 사용자 기기에 옛날 버전이 캐시돼서 새 버전이 보이지 않음
- 단순 버그 수정/텍스트 수정 정도는 그대로 둬도 무방

### 4) Firebase SDK 버전 통일

`index.html` 상단의 세 스크립트는 같은 버전을 써야 함:
- `firebase-app-compat.js`
- `firebase-firestore-compat.js`
- `firebase-auth-compat.js`

현재 `10.12.2` 사용 중. 업그레이드 시 셋 다 동일 버전으로.

## 작업 흐름 (멀티 디바이스)

사용자는 PC / 모바일 / 웹(claude.ai/code)을 오가며 작업합니다.
**충돌 방지를 위해 다음을 지키세요:**

### 세션 시작할 때 (가장 먼저)
```bash
git pull
```
다른 기기에서 작업했을 가능성이 있으니 항상 최신본부터 가져오기.

### 세션 끝낼 때 (반드시)
```bash
git add <파일>
git commit -m "한국어 커밋 메시지 OK"
git push
```
push 안 하면 다음 기기에서 이어 작업 불가.

### 사용자 응대 방식
- 사용자는 **명령어를 직접 치지 않음** — 한국어로 요청하면 클로드가 git/파일 작업 수행
- 새 용어 처음 등장 시 짧게 풀어서 설명 (예: "push = GitHub에 업로드")
- 명령어 실행 전 무엇을 할지 먼저 안내한 뒤 실행

## 코딩 스타일

- HTML/CSS/JS 모두 `index.html` 한 파일
- CSS 변수는 `:root`에 토큰으로 정의 (예: `--blue`, `--bg`, `--label`)
- 클래스명은 짧은 약어 패턴 (`.bb` = bubble, `.bico` = button icon, `.p-tab` = popup tab)
- 색상 토큰은 카테고리별로 정의: `--c-today`, `--c-sched`, `--c-someday`, `--c-memo`, `--c-done`
- 한국어 주석/문자열 OK

## 데이터 모델 (Firestore)

상세 스키마는 `index.html`의 Firestore 호출 부분에서 직접 확인.
- 사용자별 데이터는 인증된 uid 기준으로 분리
- 실시간 리스너(`onSnapshot`)로 동기화

## 참고

- GitHub repo: https://github.com/freecoke1903/planner4me (Private)
- Firebase project: `plannerforme-db9ac`
