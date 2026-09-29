---
id: os-v1-design
title: "YouTube Channel OS v1 설계"
category: "제품 설계"
status: "설계 완료"
updated: "2026-09-30"
order: "10"
summary: "아이디어 수집부터 업로드 이후 분석까지 이어지는 Creator Workspace의 전체 정보 구조와 MVP 범위를 정의한 문서."
nextAction: "v0.1 범위에 맞춰 Dashboard, Ideas, Contents, Content Project, AI Studio의 화면·데이터 구조를 구현한다."
tags: "IA, MVP, Workflow, Supabase"
source: "project conversation reconstruction"
---
# YouTube Channel OS v1 설계

> 이 문서는 YT OS 프로젝트 대화에서 확정된 설계를 바탕으로 문서 허브용으로 재구성한 버전이다.

## 1. 제품 한 줄 정의

YT OS는 **유튜브 채널 운영의 전 과정을 하나의 작업 공간으로 연결하는 개인용 Creator Workspace**다. 아이디어를 떠올리는 순간부터 조사, 기획, 대본, 촬영, 편집, 썸네일, 업로드, 분석까지 서로 끊기지 않게 이어지는 것이 핵심이다.

## 2. 메인 내비게이션

| 메뉴 | 역할 |
|---|---|
| Dashboard | 오늘 해야 할 일, 진행 중 콘텐츠, 최근 아이디어, 일정 요약 |
| Ideas | 아이디어 빠른 저장, 분류, AI 발전 |
| Contents | 모든 콘텐츠를 상태별로 보는 Kanban/목록 |
| Calendar | 촬영·편집·업로드 일정 |
| Analytics | 게시 후 성과 분석 |
| Channel | 채널 방향성, 타깃, 톤, 금지 요소 등 Context |
| AI Studio | 채널 맥락을 반영한 기획·대본·제목 생성 |

## 3. 콘텐츠 상태 흐름

Idea -> Research -> Planning -> Script -> Recording -> Editing -> Thumbnail -> Scheduled -> Published

이 상태는 단순한 태그가 아니라 프로젝트 진행 단계다. Contents의 Kanban과 각 Content Project의 세부 탭이 같은 진행 상태를 공유해야 한다.

## 4. Content Project

하나의 영상을 독립 프로젝트로 취급한다.

### 탭 구조

- Overview
- Research
- Structure
- Script
- Recording
- Editing
- Thumbnail
- Upload
- Analytics

Overview에서는 영상의 목적, 타깃, 현재 단계, 마감일, 핵심 체크리스트를 빠르게 확인한다.

## 5. AI의 역할

AI는 독립된 챗봇이 아니라 YT OS 내부의 **작업 보조 계층**으로 들어간다.

- Idea를 영상 기획으로 발전
- Research 내용 요약 및 쟁점 정리
- Structure 초안 생성
- Script 작성·수정
- 제목 후보 및 썸네일 문구 생성
- 기존 Channel Context를 모든 생성 작업에 반영

## 6. Channel Context

AI와 프로젝트 전체가 공유하는 채널 기준 정보다.

- 채널 목적
- 주요 주제
- 타깃 시청자
- 말투와 분위기
- 자주 사용하는 영상 형식
- 피하고 싶은 표현
- 참고 채널/콘텐츠

## 7. 버전 로드맵

### v0.1

Ideas -> Kanban -> Content Project -> AI Studio 흐름을 완성한다.

### v0.2

기본 Editor, 제목/썸네일 작업, Calendar를 추가한다.

### v0.3

Analytics와 외부 API 연동을 추가한다.

### v1

기획, 제작, 편집, 배포, 분석이 하나의 일관된 Creator OS로 동작한다.

## 8. 기본 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- PostgreSQL
- OpenAI API
- Recharts
- dnd-kit

## 9. 현재 기준 MVP

MVP에서는 모든 기능을 얕게 넣지 않는다. **Ideas + Contents Kanban + Content Project + AI Studio**가 실제로 한 흐름으로 연결되는 것을 우선한다.
