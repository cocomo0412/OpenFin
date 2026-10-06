# OpenFin pipeline review — 2026-10-06

Baseline: 1e6d7f025e0decede75c82495a9ab9854ba536da. Scope: scripts/knowledge/**, tests/knowledge/**, tests/*.py. No production code/data changes, external requests, environment/secret-file reads, refreshes or deployment. Only this report and pipeline-coverage.json written by this subagent; concurrent agents are outside this statement.

89 files received inventory/static security-surface review. JSON records every file hash, line count, depth and execution status. Large build/quality modules and UI tests received selective/static review, not exhaustive semantic proof. Financial/legal facts were not evaluated.

## Findings

### F01 — P2, synthetic-confirmed: Finlife accepts inconsistent provider totals

Active default: scripts/knowledge/api-pagination.mjs:5-12; collect-finlife-candidates.mjs:140-158; downstream integrate-current-data.mjs:71-76.

collectPages stops at accepted length >= the current page total without pinning the first total. An in-memory loader returning total=1 with two unique rows returns both. A loader returning total=4 and one row on page 1, then total=2 and one row on page 2 returns two. Caller saves available_count from accepted row length, discarding provider expected count; downstream equality checks cannot detect those unique-row cases. The first provider total may therefore be underfilled without collection failure.

Boundary: overlapping pages return 4 rows/3 identities from the helper, but caller dedup plus downstream count validation blocks that case. Do not claim overlapping rows are successfully published. No actual provider response corruption was observed.

Action: pin expected_total, reject changes/overcount, persist declared total, require exact count and source identity uniqueness before replacement. Add regression cases for rising/falling totals, overcount and overlap. Existing pagination tests miss these cases. Reproduce safely by importing only collectPages and supplying an async in-memory loader.

### F02 — P2, synthetic-confirmed: ECOS duplicate rows pass completeness gates

Active default: scripts/knowledge/collect-public-apis.py:182-204; build-collection-inventory.py:10-29; integrate-current-data.mjs:143-155.

Two identical mocked ECOS rows (TIME=20261001, DATA_VALUE=2.5, declared total=2) produce complete=true, collected_count=2 and only one candidate identity. Inventory validator passes because count/hash checks do not reject ECOS duplicate identities. Integration silently skips the duplicate and records 1 canonical observation for 2 collection rows while setting canonical_applied=true. Its report exposes the count difference but does not reject it. This demonstrates false-positive completeness, not a proven live missing observation.

Action: validate ECOS statistic/item/cycle/time identity, stable totals, row shape, requested period and repeated identities (including changed values at one identity); enforce uniqueness in publication as defense in depth. Reject or explicitly reconcile canonical reductions. Reproduction imports only collector and inventory modules, replaces collector.request with a JSON mock and passes a synthetic credential directly. Do not import refresh-public-apis.py: its module body loads environment files.

### F03 — P2, synthetic-confirmed: source timeout excludes response body

Manual source-status command, not default collection: scripts/knowledge/track-sources.mjs:78-120.

fetchWithTimeout clears the abort timer once headers arrive; readBody then awaits reader.read without deadline. Byte cap cannot stop a stalled stream. Actual function source extracted unchanged into a VM with mocked fetch reproduces a 5 ms configured timeout still pending after 50 ms, signal.aborted=false, no network calls. A slow/stalled host can keep the local/CI run pending indefinitely.

Action: keep one abort deadline through body completion/cancellation, release reader in finally, test header-fast/body-stalled and drip-feed streams. This is availability exposure, not proof of public SSRF/RCE.

### F04 — P2, confirmed design exposure; failure not injected: refresh publication is not transactional

Active defaults: scripts/knowledge/common.mjs:24-38; build-collection-inventory.py:40-52,79; integrate-current-data.mjs:200-217; build.mjs:78-84; validation follows integration/build in refresh-all.mjs:20-25.

Inventory writes each public snapshot before validating later snapshots. Integration directly rewrites multiple canonical files. Build removes old ontology/exact-fetch shards before completing replacement outputs. A later invalid input, write error or process interruption can leave a partial local generation, old metadata or absent shards. Direct writes also permit interrupted truncation. These paths have no group rollback. This does not prove deployed corruption: refresh does not deploy, and release checks can prevent publication.

Action: validate all inputs, build into a candidate directory, validate the full generation, then atomically switch generation/pointer. At minimum temp+rename each snapshot and retain old shards until new manifest succeeds. Test after-N-write failures in an isolated fixture tree. No fault injection on this workspace. Positive exception: refresh-public-apis.py:43-48 already validates and temp.replace swaps each candidate snapshot.

## Policy/security observations and limits

- refresh-all.mjs:8-28 does not invoke HTML/PDF policy collectors, collect-disclosures, tax web collectors or integrate-disclosures. They are legacy/manual paths, not an active automatic fallback. They must remain excluded absent explicit authorization. URL fragments API/rest alone do not prove an official documented API. No remote documentation verification was conducted.
- Public API failures record exception class and preserve the old file/date; additional Finlife preserves the previous successful group/date with failure details. Same-day guards distinguish retained failures. Pipeline completion must not be interpreted as all providers being current.
- Provider dates are separated from checked/build timestamps. Latest-period discovery in refresh-public-apis.py:32-39 checks only a 100-row probe plus prior period. Without a descending-order API guarantee, newest-period completeness remains unverified; not a confirmed live staleness incident.
- No real key was accessed. Fixed API hosts and safe error-code/type handling reduce exposure. refresh-all masking covers exact env strings; URL-encoded/otherwise transformed forms merit synthetic hardening tests, not a claim of a confirmed leak.
- Manual tracker follows trusted local registry URLs/redirects; legacy document collectors accept operator targets; verify-public-parity accepts operator-configured URLs and lacks a fetch deadline. These are trust-boundary/deadline hardening cases. No public untrusted input-to-network SSRF path established in this scope.
- Recommendation approval schema requires HMAC-SHA256; verifier checks signature, checksum/generation and expiry. No alternate-algorithm bypass confirmed. No secret accessed. Full runtime authorization is a separate scope.

## Tests and coverage

29 safe existing tests passed: 17 Node cases across api-pagination, refresh-pipeline, disclosure-normalizers, disclosure-receipts, source-review-selection, runtime-monitoring and compile-financial-rules; 10 Python public-API cases; 2 Python KDIC publication cases. Python used -B. Additional F01-F03 checks were in-memory mocks without external traffic. Import/mutation guards were inspected first.

Full npm test/build/refresh NOT run. decision-snapshots.test.mjs:12,40,45 and pipeline.test.mjs's deterministic-build case invoke actual builders; refresh-ledger.test.mjs writes reports; vertical-slice.test.mjs:12 invokes a report that builds and writes; test_disclosure_collectors.py imports a module with OUT.mkdir before mocks. Other definitions were inspected/surface-scanned with exact depth in JSON, not all executed. Passing selected tests does not clear untested branches.

No live provider replay, process-kill/disk-full experiment, production scan, remote release verification, provider specification revalidation, legal advice or financial semantic audit occurred.

## Deployment

Report-only changes require neither homepage nor MCP deployment. Later collector fixes would need controlled refresh/validation; changed docs are homepage inputs, and regenerated free-catalog/bundle inputs require a separate MCP deployment assessment. This review did not deploy.
