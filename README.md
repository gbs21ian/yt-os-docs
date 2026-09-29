# YT OS Project Docs Hub

YT OS 프로젝트의 설계, 개발 명세, 로드맵을 한 곳에서 읽고 검색하는 정적 문서 허브입니다.

## 로컬 실행

```bash
npm run build
npm run dev
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 새 문서 추가

`docs/` 폴더에 Markdown 파일을 추가합니다.

```md
---
id: example
title: "문서 제목"
category: "카테고리"
status: "진행 중"
updated: "2026-09-30"
order: "50"
summary: "카드에 표시할 짧은 설명"
nextAction: "이 문서와 관련해 다음으로 할 일"
tags: "tag1, tag2"
---
# 문서 제목

본문...
```

`npm run build`가 `docs/`를 재귀적으로 스캔해 `dist/docs.json`을 자동 생성합니다.

## Cloudflare Pages 배포

GitHub 저장소에 이 폴더를 올린 뒤 Cloudflare Pages에서 저장소를 연결합니다.

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 20 이상 권장

이후 `docs/`에 문서를 추가하거나 수정해서 Git push만 하면 Cloudflare Pages가 자동으로 재빌드하므로 사이트도 자동 갱신됩니다.

## 문서 관리 원칙

- 실제 구현과 문서가 달라지면 문서를 즉시 수정합니다.
- `nextAction`은 실행 가능한 한 문장으로 유지합니다.
- 완료된 문서는 `status: "완료"` 또는 `status: "설계 완료"`로 표시합니다.
- 원본 문서가 따로 있다면 이 허브의 재구성본을 원본으로 교체할 수 있습니다.
