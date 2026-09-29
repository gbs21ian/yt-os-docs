---
id: editor-design
title: "YT OS 내장 편집기 설계"
category: "편집기"
status: "설계 완료"
updated: "2026-09-30"
order: "20"
summary: "YT OS의 기획·대본 구조와 직접 연결되는 기본 영상 편집기의 UI, 기능 범위, AI 보조 기능을 정의한다."
nextAction: "v0.1 코어가 안정된 뒤 Editor MVP를 별도 모듈로 구현하고 Content Project의 Editing 탭과 연결한다."
tags: "Editor, Timeline, AI, WebCodecs"
source: "project conversation reconstruction"
---
# YT OS 내장 편집기 설계

> 목표는 Premiere Pro를 복제하는 것이 아니라, **YT OS 안에서 영상 한 편을 끝까지 완성할 수 있는 편집기**를 만드는 것이다.

## 1. 핵심 레이아웃

- Media/Assets 패널
- Preview Player
- Inspector
- Multi-track Timeline
- Script/Structure 연동 패널

## 2. Editor MVP 기능

### 타임라인

- 영상·오디오 멀티트랙
- 클립 이동
- Split/Cut
- Delete
- Trim
- 기본 전환
- Undo/Redo

### 요소

- 텍스트
- 자막
- 이미지
- 오디오/BGM

### 클립 속성

- 볼륨
- 재생 속도
- 위치 및 기본 크기

## 3. YT OS만의 연결점

일반 편집 프로그램과 가장 크게 달라야 하는 부분이다.

### Structure 연동

기획 단계에서 만든 영상 구조를 타임라인 마커로 가져온다.

예시:

- Hook
- Intro
- Point 1
- Point 2
- Conclusion
- CTA

### Script 연동

Script의 문단/문장을 편집 구간과 연결하여 촬영 및 편집 체크리스트로 사용할 수 있다.

## 4. AI 편집 보조

- 음성 받아쓰기
- 침묵 구간 감지
- 반복 발화 감지
- 말실수 후보 감지
- B-roll 삽입 후보 제안
- 긴 영상에서 Shorts 후보 구간 추출
- 자막 초안 생성

AI는 자동으로 원본을 파괴하지 않고 **제안 -> 사용자 승인 -> 적용** 흐름을 기본으로 한다.

## 5. 렌더링 후보

- WebCodecs 기반 브라우저 처리
- Remotion 기반 렌더 파이프라인

초기에는 기술적 안정성과 구현 난이도를 보고 한쪽을 중심으로 선택한다.

## 6. v1에서 제외할 고급 기능

- 전문 색보정
- 복잡한 키프레임 애니메이션
- 고급 마스킹
- 플러그인 생태계
- 전문 오디오 믹싱

핵심은 기능 수가 아니라 YT OS의 기획 문맥과 편집기가 자연스럽게 이어지는 것이다.
