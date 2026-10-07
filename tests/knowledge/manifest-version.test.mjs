import assert from 'node:assert/strict';
import test from 'node:test';
import { manifestVersionForCollection } from '../../scripts/knowledge/manifest-version.mjs';

const previous = {
  version: 'KR-FINANCE-ONTOLOGY-MANIFEST-2026.07.18.1',
  api_collection: { basis_date: '2026-10-01' },
};

test('a collection snapshot advances the manifest version over the previous API basis', () => {
  assert.equal(manifestVersionForCollection({ snapshot_basis_date: '2026-10-07' }, previous),
    'KR-FINANCE-ONTOLOGY-MANIFEST-2026.10.07.01');
});

test('partial refresh uses the snapshot day while preserving inherited record dates', () => {
  const collection = { snapshot_basis_date: '2026-10-07', datasets: [
    { collected_at: '2026-10-01T07:48:00Z' }, { collected_at: '2026-10-07T05:00:00Z' },
  ] };
  const before = structuredClone(collection);
  assert.equal(manifestVersionForCollection(collection, previous),
    'KR-FINANCE-ONTOLOGY-MANIFEST-2026.10.07.01');
  assert.deepEqual(collection, before);
});

test('rebuild and review timestamps cannot advance the collected version', () => {
  for (const timestamp of ['2026-10-07T15:30:00Z', '2026-10-14T15:30:00Z']) {
    assert.equal(manifestVersionForCollection(null, {
      ...previous, built_at: timestamp, source_review_date: timestamp.slice(0, 10), basis_date: '2026-10-14',
    }), 'KR-FINANCE-ONTOLOGY-MANIFEST-2026.10.01.01');
  }
});

test('same-day rebuild is stable and a real next snapshot advances the date', () => {
  const version = manifestVersionForCollection({ snapshot_basis_date: '2026-10-07' }, previous);
  assert.equal(manifestVersionForCollection({ snapshot_basis_date: '2026-10-07' }, { version }), version);
  assert.equal(manifestVersionForCollection({ snapshot_basis_date: '2026-10-14' }, { version }),
    'KR-FINANCE-ONTOLOGY-MANIFEST-2026.10.14.01');
});

test('missing collection evidence retains the previous version, never a build date', () => {
  assert.equal(manifestVersionForCollection(null, { version: previous.version, built_at: '2026-10-14T00:00:00Z' }), previous.version);
  assert.throws(() => manifestVersionForCollection(null, { built_at: '2026-10-14T00:00:00Z' }), /collection basis date/);
});

test('collection dates require an exact valid calendar date without timestamp conversion', () => {
  for (const basis of ['', '2026-02-29', '2026-02-30', '2026-13-01', '2026-1-7', '2026-10-07T23:00:00Z', 20261007]) {
    assert.throws(() => manifestVersionForCollection({ snapshot_basis_date: basis }, previous), /basis date/);
  }
  assert.equal(manifestVersionForCollection({ snapshot_basis_date: '2028-02-29' }, previous),
    'KR-FINANCE-ONTOLOGY-MANIFEST-2028.02.29.01');
});
