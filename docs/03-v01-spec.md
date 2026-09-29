---
id: v01-product-dev-spec
title: "YouTube Channel OS v0.1 제품·개발 명세서"
category: "개발 명세"
status: "구현 대기"
updated: "2026-09-30"
order: "30"
summary: "첫 실제 구현 버전의 목표, 필수 화면, 사용자 흐름, 포함/제외 범위를 개발 관점에서 고정한 명세."
nextAction: "저장소를 초기화하고 App Shell, 데이터 모델, Ideas, Contents Kanban 순서로 기반을 구현한다."
tags: "v0.1, Spec, Next.js, Supabase"
source: "project conversation reconstruction"
---
# YouTube Channel OS v0.1 제품·개발 명세서

## 1. v0.1 목표

아이디어 -> 기획 -> 대본 -> 촬영 -> 편집으로 이어지는 흐름을 하나의 개인용 Creator Workspace 안에 연결한다.

완성 기준은 메뉴가 많이 존재하는 것이 아니라 **하나의 아이디어를 실제 Content Project로 전환하고, 작업 단계를 이동시키며, AI의 도움을 받아 제작 준비까지 이어갈 수 있는가**다.

## 2. 필수 기능

- Dashboard
- Ideas
- Contents
- Content Project
- AI Studio
- 기본 Editor 진입점
- Channel Profile / Context
- Assets
- Autosave

## 3. 빠른 아이디어 저장

`Ctrl + K`를 중심으로 어디서든 아이디어를 빠르게 입력할 수 있게 한다.

흐름:

1. 아이디어 저장
2. 태그/상태 부여
3. AI로 아이디어 발전
4. Content Project 생성
5. Contents Kanban에 배치

## 4. Content Project 탭

- Overview
- Research
- Structure
- Script
- Recording
- Editing
- Thumbnail
- Upload

각 탭은 별도 문서가 아니라 같은 콘텐츠 엔티티의 작업 단계다.

## 5. Sidebar

- Dashboard
- Ideas
- Contents
- Calendar
- Editor
- AI Studio
- Assets
- Channel Profile
- Analytics
- Settings

v0.1에서 아직 구현되지 않은 메뉴는 Disabled/Coming Soon으로 구분할 수 있다.

## 6. Contents

### 기본 보기

Kanban을 기본으로 사용한다.

- Idea
- Research
- Planning
- Script
- Recording
- Editing
- Thumbnail
- Scheduled
- Published

카드는 drag & drop으로 상태를 변경하며 변경 결과는 즉시 저장한다.

## 7. AI Studio

AI Studio의 생성 결과는 고립된 텍스트가 아니라 프로젝트에 넣을 수 있어야 한다.

예:

- Idea 발전 결과 -> Research/Overview
- 영상 구조 -> Structure
- 대본 -> Script
- 제목 후보 -> Thumbnail/Upload

## 8. 저장과 안정성

- Autosave
- 작업 중 상태 표시
- 저장 실패 시 명확한 오류 표시
- 프로젝트별 최근 수정 시간 기록

## 9. v0.1 제외 범위

- YouTube 직접 업로드
- YouTube Analytics API 연동
- 고급 영상 편집
- 실시간 협업
- 모바일 영상 편집

이 기능들은 기반이 안정된 뒤 다음 버전에서 확장한다.

## 10. 구현 우선순위

1. App Shell / 라우팅 / 공통 레이아웃
2. 인증 및 Supabase 연결
3. 핵심 데이터 모델
4. Ideas
5. Contents Kanban
6. Content Project
7. AI Studio 연결
8. Channel Context
9. Assets / Autosave
10. Editor 진입점

## 11. v0.1 완료 조건

- 아이디어를 10초 안에 저장할 수 있다.
- 아이디어를 Content Project로 변환할 수 있다.
- 프로젝트가 Kanban 상태와 동기화된다.
- 프로젝트 안에서 Structure와 Script를 작성할 수 있다.
- AI 결과를 해당 프로젝트 섹션에 적용할 수 있다.
- 새로고침 후에도 작업 내용이 유지된다.
