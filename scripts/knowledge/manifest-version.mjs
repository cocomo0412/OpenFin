const PREFIX = 'KR-FINANCE-ONTOLOGY-MANIFEST-';

const collectionDate = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('Manifest collection basis date must be YYYY-MM-DD');
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error('Manifest collection basis date must be a valid calendar date');
  }
  return value;
};

// This labels the assembled collection day, not the age of every included row.
// Partial refreshes retain older records and their dates. The daily suffix stays
// at 01; manifest_checksum distinguishes content changes, including same-day ones.
// Build/review timestamps must never manufacture a newer collection version.
export function manifestVersionForCollection(collection, manifest = {}) {
  const basis = collection?.snapshot_basis_date ?? manifest.api_collection?.basis_date;
  if (basis === undefined || basis === null) {
    if (typeof manifest.version !== 'string' || !manifest.version.startsWith(PREFIX)) {
      throw new Error('Manifest needs a collection basis date or an existing version');
    }
    return manifest.version;
  }
  return `${PREFIX}${collectionDate(basis).replaceAll('-', '.')}.01`;
}
