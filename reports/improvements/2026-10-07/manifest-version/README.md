# 자료 갱신일 기반 버전 수정

확인일: 2026-10-07. 기존 빌드가 과거 manifest.version을 그대로 재사용하여 홈페이지에 2026.07.18.1이 표시됐다.

실제 API 수집 기준일(snapshot_basis_date)을 우선하고 기존 api_collection.basis_date를 보조 기준으로 사용하도록 수정했다. 현재 버전은 `KR-FINANCE-ONTOLOGY-MANIFEST-2026.10.07.1`이다. 단순 빌드일로 수집 날짜를 올리지 않으며 부분 갱신에서 보존한 개별 자료의 날짜도 바꾸지 않는다. 같은 수집일의 내용 차이는 manifest_checksum으로 구분한다.

## 검증

- 구현 담당과 별도로 주 담당자가 검토 및 테스트 실행.
- manifest-version 및 api-integration 테스트 9/9 통과. build.mjs 구문 검사 통과.
- 기존 공개 manifest와 비교하여 변경 필드는 version, manifest_checksum 두 개뿐임을 확인.
- 체크섬 독립 재계산 일치: `a478f5a681639931a04ce5e4d3f575eaacc628b0f11617b1bca5513c99842cc8`.
- 금융 자료·개별 수집일·API 키·수집기 제한 시간 변경 없음.
- 개발·운영 매뉴얼 및 변경 이력 1.6.1로 갱신.

## 배포 구분

- 홈페이지: 필요. 공개 manifest 버전과 체크섬 변경.
- MCP: 불필요. 코드·설정·의존성·세금 번들 입력 변경 없음.
- 실제 홈페이지 반영 결과는 deployment.json에서 별도 확인한다.
