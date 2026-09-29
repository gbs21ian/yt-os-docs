---
id: implementation-roadmap
title: "구현 로드맵 · 지금 무엇을 해야 하나"
category: "로드맵"
status: "진행 중"
updated: "2026-09-30"
order: "40"
summary: "문서 작업을 끝내고 실제 코딩으로 넘어갈 때의 구현 순서를 짧고 명확하게 관리하는 실행 문서."
nextAction: "Phase 1: 저장소와 App Shell을 만들고 타입·라우팅·레이아웃 규칙부터 고정한다."
tags: "Roadmap, Codex, Execution"
source: "project hub synthesis"
---
# 구현 로드맵 · 지금 무엇을 해야 하나

## 현재 판단

기획을 더 길게 늘리는 것보다 이제는 **v0.1 기반 구현으로 넘어가는 단계**다. 다만 구현 중 결정이 흔들리지 않도록 이 문서 허브의 명세를 기준점으로 사용한다.

## Phase 1. Foundation

- 프로젝트 저장소 초기화
- Next.js + TypeScript
- Tailwind + UI 기본 규칙
- App Shell
- Sidebar / Header / Main workspace
- 라우팅 구조
- 공통 타입 정의

### 완료 조건

빈 페이지 모음이 아니라, 실제 YT OS의 전체 뼈대가 클릭 가능한 상태로 존재한다.

## Phase 2. Data

- Supabase 연결
- 콘텐츠/아이디어/채널 Context 데이터 모델
- CRUD
- Autosave 기반

## Phase 3. Core Workflow

- Ideas
- Contents Kanban
- Content Project
- 상태 이동 및 동기화

## Phase 4. AI Layer

- AI Studio
- Channel Context 주입
- 결과를 Research/Structure/Script에 바로 적용

## Phase 5. Production Tools

- Assets
- Recording 체크리스트
- Editor MVP
- Thumbnail/Upload 준비 화면

## Phase 6. Expansion

- Calendar
- Analytics
- 외부 YouTube API
- 고급 편집 기능

## 개발 중 원칙

1. 문서에 없는 기능을 즉흥적으로 크게 추가하지 않는다.
2. 한 단계가 실제로 연결된 뒤 다음 단계로 넘어간다.
3. UI만 존재하고 데이터가 연결되지 않는 가짜 기능을 최소화한다.
4. AI 기능은 항상 실제 프로젝트 데이터에 연결한다.
5. 문서와 구현이 달라졌다면 구현 직후 문서를 갱신한다.
