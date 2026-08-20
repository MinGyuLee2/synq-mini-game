# 회의에서 살아남기 · SynQ 미니게임

Figma의 000~008 화면 흐름과 첨부 기능명세를 기준으로 새로 구현한 정적 웹 미니게임입니다.

## 실행

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`으로 접속합니다.

## 흐름

시작 → 역할 선택 → 역할별 브리핑 → 3개 질문 → 성향 결과 → 역할별 SynQ Hint → CTA

별도 빌드나 외부 라이브러리가 필요하지 않습니다. 첨부된 DenkiChip 한글 픽셀 폰트는 `assets/x10y12pxDenkiChipHangul.ttf`에서 로드합니다.

## Cloudflare Pages 배포

이 저장소는 정적 사이트이므로 별도 빌드 설정 없이 Cloudflare Pages에 연결할 수 있습니다.

1. Cloudflare 대시보드에서 **Workers & Pages → Create application → Pages → Connect to Git**을 선택합니다.
2. `MinGyuLee2/synq-meeting-game` 저장소와 `main` 브랜치를 선택합니다.
3. Framework preset은 **None**, Build command는 비워두고, Build output directory는 저장소 루트(`/`)로 설정합니다.
4. **Save and Deploy**를 누르면 이후 `main` 브랜치로 푸시할 때마다 자동 배포됩니다.

`index.html`이 저장소 최상단에 있고 모든 에셋은 상대 경로로 참조되므로, 추가 환경 변수나 빌드 단계는 필요하지 않습니다.

시작·역할 선택·역할별 브리핑·질문·주요 결과·역할별 힌트·CTA 화면은 `assets/figma-2x/`의 Figma 2× 프레임(`2880×2048`)을 사용하며, 브라우저에서는 논리 크기 `1440×1024`로 표시됩니다. 원본 프레임 위에는 동작에 필요한 투명 클릭 영역만 배치합니다.

결과 화면은 `확인형(006-d)`, `추진형(006-e)`, `리스크 탐지형(006-f)`, `조율형(006-g)`, `제안형(006-h)`의 Figma 원본 프레임으로 표시됩니다.
