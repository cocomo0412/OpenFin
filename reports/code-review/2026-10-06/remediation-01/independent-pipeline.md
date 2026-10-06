# 파이프라인 수정 독립 검토

검토일: 2026-10-06. 검토자: MCP 개발 구현 담당. 검토 범위: SEC-02/03/04/06의 트랜잭션·빌드 진입점·페이지 완전성·HTTP 본문 제한. 파이프라인 구현 담당과 다른 담당자가 검토했다. 운영 수집·주서비스 산출물 재빌드는 수행하지 않았으며 임시 디렉터리와 주입 응답만 사용했다.

## 확인한 경계

- `refresh-transaction.mjs`: 공개 산출물·canonical/evidence·수집 snapshot을 백업하고 검증 실패 시 복구한다. 복구 시 원본 백업은 전체 완료까지 남겨 반복 복구가 가능하다. `committed` 기록 뒤 cleanup 실패는 rollback하지 않는다. 다음 실행은 committed 잔재만 정리한다.
- `build-validated.mjs`, `build.mjs`, `refresh-all.mjs`: 상위 실행의 토큰/저널 안에 참여하거나 독립 실행 트랜잭션을 만든다. 검증 실패가 부모의 commit으로 이어지지 않는다. `integrate-current-data.mjs`는 직접 실행하면 개별 atomic write만 적용되며, 여러 파일의 일괄 복구는 상위 `refresh-all` 안에서 실행할 때 적용된다. `common.mjs` 파일 쓰기는 임시 파일을 완성한 뒤 교체한다.
- `api-pagination.mjs`: 시작 총량 고정, 페이지 반복·총량 변경·초과·조기 종료를 거부한다. Finlife는 공급기관의 상품 ID를 기준으로 중복을 검사한다. ECOS는 통계/항목/시간 복합 ID와 요청 통계·기간을 검사하고, 공개 inventory 검증에서도 중복 ID를 재검사한다.
- `source-http.mjs`: header와 body 전체에 하나의 deadline을 적용한다. body가 조금씩 도착해도 deadline은 연장되지 않으며 byte 상한 이후 읽기를 중단하고 취소한다.

## 독립 검토 중 발견·보완

1. 초기 구현의 rollback은 살아있는 stage 자식을 확인하지 않았다. 임시 fixture에서 실제 자식이 지연 기록하도록 실행한 결과 복구 직후 `old`였던 파일이 자식 종료 후 `orphan-stage-write`로 바뀌었다. 담당자에게 전달했고 rollback의 자식 생존 확인과 저널 보존, 관련 회귀 검사가 추가됐다.
2. stale lock 읽기→삭제→새 lock 생성 구간은 동시 복구자가 새 lock을 지울 수 있었다. 담당자가 `mkdir`의 원자적 recovery claim으로 begin 전체를 직렬화했다. claim이 남은 중단 상황은 자동 삭제하지 않고 점검 대상으로 차단한다. 정상 live lock도 계속 거부한다.
3. 프로세스 spawn과 PID 기록 사이의 강제중단 창에 대해 launch 예약표시와 복구 차단을 전달했고 반영됐다. primary/stage 모두 spawn 전에 예약표시를 기록하며 PID 등록과 표시 해제를 함께 저장한다. 예약표시가 남으면 자동 복구를 거부한다. 보호된 child 진입점도 자기 PID 등록 전에는 다음 작업을 시작하지 않는다.

## 실행 근거

- `node --test tests/knowledge/refresh-transaction.test.mjs tests/knowledge/api-pagination.test.mjs tests/knowledge/source-http.test.mjs`: 최종 18/18 통과. 실제 fixture 프로세스 종료 후 다음 실행 복구, 검증 실패 rollback, cleanup 실패 후 검증 결과 유지, 경로 범위 거부, orphan stage 생존 차단, 등록 전 중단 차단을 포함한다.
- `python -m unittest discover -s tests -p test_public_apis.py`: 15/15 통과. 중복/변경된 관측값·요청 범위 외 ECOS 행·총량 변동 및 공개 gate 중복 검사를 포함한다.
- 소유 코드 수정은 구현 담당자가 수행했다. 이 검토자는 보고서만 작성했다.
- 추가 독립 임시 fixture에서 실제 `transactionalEntry` child를 강제종료했다. 이 Windows 실행은 stage도 종료되어 wrapper가 실패 코드 1로 끝나며 이전 파일을 복구했다. 이후 새 트랜잭션에서도 이전 파일이 유지됐다. 별도로 살아있는 orphan stage는 회귀 검사에서 지연 쓰기 실프로세스로 검증했다.

## 운영 한계

이 구현은 로컬 작업 트리의 검증·복구 경계다. 여러 디렉터리를 독자적으로 읽는 외부 배포 도구에 대한 원자적 공개 전환을 제공하지 않는다. 활성 저널/복구 claim이 있는 동안 배포하지 않아야 하며, 강제중단 후 남은 claim은 자식 프로세스 및 백업 상태를 확인하고 처리해야 한다. 디스크 전체 손상·전원 차단 시 파일시스템 내구성까지 실험한 것은 아니다. 실제 기관/API와의 통합 시험은 실행하지 않았다.

## 후속 확인

위 세 검토 지적의 후속 코드를 확인했고 관련 최종 검사도 통과했다. 검토 범위에서 추가 조치가 필요한 결함은 발견하지 않았다. 원격 운영 반영이나 모든 실패 시점의 자동 복구를 보증하는 결과는 아니다.
