# Game Website Project Guide

## Project Purpose

이 프로젝트는 포트폴리오용 게임소개 웹사이트입니다.

단순한 설명 페이지가 아니라, 실제 게임 공식 웹사이트나 스팀 소개 페이지처럼 보이는 완성도 있는 사이트를 목표로 합니다.

첫 화면에서 게임의 제목, 장르, 분위기, 세계관이 바로 느껴져야 합니다.

## Website Direction

시네마틱한 게임 소개 웹사이트를 제작합니다.

이 사이트는 다음 역량을 보여주는 포트폴리오여야 합니다.

- 웹디자인 감각
- HTML 구조 설계
- CSS 레이아웃
- 반응형 웹 구현
- 기본 JavaScript 인터랙션
- 시각적 완성도

## Game Concept

임시 게임 콘셉트는 아래와 같이 설정합니다.

- Game Title: Eclipse Frontier
- Genre: Sci-fi Action Adventure
- Mood: cinematic, mysterious, tense, immersive
- World: 버려진 우주 식민지와 미지의 신호를 탐사하는 세계
- Main Appeal: 탐험, 전투, 분위기, 스토리 미스터리

이 콘셉트는 나중에 변경할 수 있습니다.

## Target Audience

이 웹사이트는 다음 사람들에게 보여주기 위한 포트폴리오입니다.

- 웹디자인 평가자
- 프론트엔드 포트폴리오 리뷰어
- 강사 또는 면접관
- 게임과 인터랙티브 웹사이트에 관심 있는 사람

## Core Sections

첫 번째 버전에는 아래 섹션을 포함합니다.

### 1. Hero

- 게임 제목
- 짧은 태그라인
- 강렬한 배경 이미지
- 주요 버튼
- 보조 버튼

### 2. Game Overview

- 게임 세계관 소개
- 장르 설명
- 플레이 경험 요약
- 핵심 매력 2-3개

### 3. Features

- 탐험
- 전투 또는 도전 요소
- 스토리 미스터리
- 성장 또는 업그레이드 시스템

### 4. Characters or Factions

- 캐릭터 또는 세력 3개
- 이름
- 역할
- 짧은 설명

### 5. Gallery

- 스크린샷 스타일 이미지 영역
- 실제 이미지가 없으면 분위기 있는 플레이스홀더 사용

### 6. CTA / Footer

- 다운로드, 위시리스트, 문의 버튼
- 제작자 또는 스튜디오 정보

## Visual Direction

사이트는 아래 분위기를 가져야 합니다.

- 시네마틱
- 몰입감 있는
- 어두운 배경
- 고급스러운
- 미래적인
- 가독성 있는

추천 스타일:

- 어두운 배경
- 밝은 본문 텍스트
- 하나의 강한 포인트 컬러
- 큰 게임 타이틀
- 넓은 이미지 중심 레이아웃
- 은은한 hover 효과

피해야 할 것:

- 평범한 흰색 문서 느낌
- 너무 많은 설명 텍스트
- 일반 회사 랜딩페이지 같은 느낌
- 과한 장식
- 모바일에서 깨지는 레이아웃

## Color Direction

추천 색상 방향:

- Background: near-black, deep charcoal
- Text: off-white
- Sub Text: cool gray
- Accent: electric cyan, amber, or signal green
- Surface: dark gray panels

전체가 한 가지 색으로만 보이지 않게 색상 대비를 유지합니다.

## Typography Direction

기본 폰트는 깔끔한 sans-serif를 사용합니다.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Hero 제목은 크고 강하게, 본문은 읽기 쉽게 구성합니다.

## Interaction Ideas

JavaScript는 필요한 만큼만 사용합니다.

가능한 기능:

- 모바일 메뉴 열기/닫기
- 부드러운 스크롤
- 갤러리 이미지 전환
- 카드 hover 효과
- 스크롤 등장 애니메이션

첫 버전에서는 너무 복잡한 기능을 만들지 않습니다.

## Technical Structure

기본 정적 웹사이트 구조를 사용합니다.

```text
/
  index.html
  style.css
  script.js
  assets/
```

HTML은 의미 있는 태그를 사용합니다.

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`

CSS 클래스 이름은 명확하고 일관성 있게 작성합니다.

## Responsive Requirements

사이트는 아래 화면에서 자연스럽게 보여야 합니다.

- Desktop
- Tablet
- Mobile

중요 규칙:

- 모바일에서 메뉴가 넘치지 않아야 합니다.
- Hero 텍스트가 잘 읽혀야 합니다.
- 카드형 섹션은 모바일에서 세로로 쌓입니다.
- 버튼은 터치하기 쉬운 크기여야 합니다.
- 이미지 비율이 깨지지 않아야 합니다.

## Content Tone

문장은 게임 홍보 사이트처럼 짧고 분위기 있게 작성합니다.

좋은 톤:

- 짧은 문장
- 몰입감 있는 표현
- 자신감 있는 소개
- 세계관이 느껴지는 카피

예시:

> A signal wakes beneath the dead colonies. Cross the frontier, recover lost technology, and decide what humanity should fear most: the silence, or the thing answering from inside it.

## Development Priorities

작업 순서:

1. HTML 구조 작성
2. CSS 기본 레이아웃 작성
3. 반응형 스타일 적용
4. 시각적 디테일 추가
5. JavaScript 인터랙션 추가
6. 데스크톱/모바일 최종 확인

## Quality Checklist

첫 버전 완료 전 확인할 것:

- Hero에서 게임 콘셉트가 바로 보인다.
- 일반 템플릿처럼 보이지 않는다.
- 주요 섹션이 모두 있다.
- 모바일과 데스크톱 모두 자연스럽다.
- 버튼과 메뉴를 사용할 수 있다.
- 텍스트 대비가 충분하다.
- 레이아웃이 겹치거나 깨지지 않는다.
- 파일 구조가 단순하고 명확하다.

