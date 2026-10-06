# Pipeline remediation — SEC-02, SEC-03, SEC-04, SEC-06

Original review artifacts remain unchanged. No external API requests, current-source recollection, environment-file/secret reads, current-data build/refresh, deployment or production fault injection was performed.

## Changes

- SEC-02: collectPages pins the first declared total, rejects changed totals and overcount, and can enforce source-specific record identity uniqueness. Finlife uses source_record_id identity. Thus the saved accepted count is only produced after equality with a stable provider count; overlapping pages also fail at collection, before replacement.
- SEC-03: ECOS validates statistic/item/time identity, requested series and date range, stable total, exact count and duplicate identities (including changed values). The publication validator independently rejects duplicate/missing ECOS identities. An injectable mock loader permits credential-free/offline regression tests.
- SEC-06: source-http.mjs owns one abort deadline across headers and bounded body consumption. Header stalls, stalled streams and drip-fed bodies all fail within the overall timeout. Cancellation never waits indefinitely. track-sources retains safe error messages and previous accepted-source handling.
- SEC-04: refresh-transaction.mjs snapshots all known mutable default outputs and selected private candidate JSON files before mutation. A persistent journal restores previous bytes/dates on failure; process interruption is recovered on the next transaction. A live primary/stage child prevents rollback/recovery until it exits, so an orphan cannot overwrite restored data. A separate atomic directory claim serializes stale-lock recovery. Explicit commit precedes cleanup; cleanup failure cannot roll back from partially removed backups.

Protected output sets: knowledge, docs/opentax, evidence/source-reviews, evidence/candidate-promotions, evidence/vertical-slice, reports/refresh, mcp/src/free-catalog.json, and .api-candidates source.* / finlife-catalog / finlife-additional / gov24-current / api-refresh-run JSON files. Failed-stage logs and refresh-pipeline-run.json remain available outside rollback. Previous successful snapshot dates are restored unchanged; partial API failures in an otherwise successful validated run still retain each failed provider's old snapshot/date through the existing collector behavior.

Protected entry points: refresh-all.mjs (full or retry), new build-validated.mjs (complete local knowledge build+validation chain), and direct build.mjs (additional validation before transaction commit). Root package knowledge:build now points to build-validated.mjs (coordinator change). Primary and stage launches first write launch_in_progress; interrupted PID registration blocks automatic recovery until inspected. Protected child entries wait for their PID registration before doing work. Stage child PIDs are journaled; inherited transaction tokens prevent nested backups while maintaining the outer transaction. No data files are copied merely by importing refresh-all in a test or using its supported --dry-run.

Common writeText uses a flushed temporary file and atomic rename, including OneDrive replacement retries; integrate-current-data and validation-receipt writes use it. Inventory validates ALL candidate snapshots before any public output is written and replaces each file through a temporary file. build retains old shards until the replacement manifest/artifacts have been written, then removes only obsolete names. Failed post-build validation triggers whole-generation rollback at protected entries.

## Tests

All tests use in-memory responses or fresh OS temporary fixture directories. Coverage includes changed/increased/decreased provider totals, overcount, overlapping Finlife identities; ECOS duplicate/changing observations, wrong series/period, independent publication duplicate rejection; header/body/drip stalls and byte limits; successful commit, stage failure, actual fixture-process kill and next-run recovery, unchanged collected_at bytes, obsolete/new files, preserved failure logs, concurrent writer rejection, malformed journal, outside-workspace paths, atomic replacement failure, live orphan-stage rejection, recovery claim exclusion, cleanup failure after commit, and standalone entry validation failure/success.

Safe focused tests passed: Node 32 distinct cases (29-case combined run, then three added recovery/orphan/launch cases covered by the 11-case transaction rerun), Python public API 15 cases and KDIC publication 2 cases. Eleven changed Node scripts passed syntax checks and three Python files passed AST parsing. ECOS null/blank identity fixtures pass at both collector and independent publication gates. No unrestricted npm test was run because existing test cases invoke current-repository builders/report writers.

## Limits and operations

This is safe rollback for local generation, not a simultaneous atomic switch across multiple directories or a live-serving deployment transaction. Never deploy or consume a generation while its active journal exists. After a killed generation, run the protected entry again: it first restores the previous generation, then starts the new work. If a recorded child is still alive, it fails closed and preserves the journal/backups.

A process killed specifically during recovery/snapshot preparation can leave .api-candidates/refresh-recovery-claim. This intentionally blocks automatic competing recovery. Inspect the owner PID, child PIDs, journal and backups before an operator clears the claim; do not delete the journal/backup to bypass a lock. Disk-full, permission failures or hardware corruption can prevent immediate restoration; the journal/backups are retained for retry. Backup space is required for protected outputs; no present-source full-generation performance measurement was performed.

Standalone Python inventory and direct integrate/decision helper scripts are not group-transaction entry points; they receive individual atomic writes/prevalidation where changed, but operators should use the protected commands for multi-stage work. Arbitrary external manual writers/editors do not participate in the lock. No assertion is made that every legacy/manual command is globally atomic.

No homepage or MCP deployment occurred. Pipeline code changes require no service deployment by themselves; a later authorized validated data generation may change homepage JSON and MCP free-catalog bundle inputs and must receive separate deployment decisions.


## Operator procedure for a retained recovery claim or interrupted launch

1. Stop scheduling new refresh/build jobs and ensure no operator runs direct writers. Read only the retained claim owner PID and journal state/child_pid/stage_pids/launch_in_progress; do not dump candidate payloads or environment files into logs.
2. Check that the recorded owner, primary child and all stage processes have exited. For launch_in_progress, a PID may never have been registered: inspect the affected refresh/build process tree and confirm no associated Node/Python child remains. A reused/ambiguous PID is not permission to recover automatically.
3. Preserve the entire refresh-transaction directory, journal and backup set. For active state, every existing output entry must have its indexed backup. If missing or unreadable, stop and restore from a known backup under operator control. Never delete the recovery journal to make an error disappear.
4. Only after exclusive maintenance is established and processes/backups are verified, clear the stale recovery claim directory at the exact repository .api-candidates/refresh-recovery-claim path. If launch_in_progress was left true, set only that marker to false in the retained journal after confirming no unknown child remains; retain all entry paths, backup mappings and state. These are deliberate operator recovery actions, not automatically performed by this change.
5. Invoke the protected entry. It serializes recovery, restores an active interrupted generation first and then begins the requested new operation. A retry/refresh command can make API requests after recovery, so choose the next operation according to its authorization; this implementation does not include a general recover-only CLI. Recheck journal cleanup and normal validation before any deployment.

The retained-claim fixture confirms that recovery refuses to acquire the old lock and leaves prior source bytes unchanged. The launch-marker fixture confirms that unregistered launch interruption preserves backup and refuses rollback. These guards intentionally trade unattended recovery for prevention of a concurrent/unknown writer corrupting restored data.


## Reproducible focused verification commands

Run from the repository root. These tests use mocks/temp fixtures and do not invoke the current repository's data builders or external API collectors.

```text
node --test tests/knowledge/api-pagination.test.mjs tests/knowledge/source-http.test.mjs tests/knowledge/refresh-transaction.test.mjs tests/knowledge/refresh-pipeline.test.mjs tests/knowledge/disclosure-normalizers.test.mjs tests/knowledge/disclosure-receipts.test.mjs tests/knowledge/source-review-selection.test.mjs tests/knowledge/runtime-monitoring.test.mjs tests/knowledge/compile-financial-rules.test.mjs
python -B -m unittest discover -s tests -p test_public_apis.py -v
python -B -m unittest discover -s tests -p test_kdic_publication.py -v
```

Expected counts after all changes: Node 32, public API Python 15, KDIC Python 2. Do not substitute unrestricted `npm test` or `knowledge:build` for this read-only-current-data verification: some existing suites rebuild real repository outputs.
