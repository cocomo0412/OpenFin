# Official disclosure refresh

This supplements API collectors with public disclosure HTML. It is **not** a
full-corpus fact-review approval or a recommendation approval.

Python dependencies: `beautifulsoup4`, `lxml`. Raw responses and receipts are
cached in the ignored `.api-candidates/disclosures` directory. No credentials
are required by these collectors.

1. Run `python scripts/knowledge/collect-disclosures.py --insurance --pension --cards --tax-sources --accounts`.
2. Run `python scripts/knowledge/audit-tax-disclosures.py` to create the review
   queue. HTTP success does not verify a rule. Inspect effective dates,
   transitional provisions, eligibility exceptions, and image-based tables.
3. Manually review any changed account/tax rules in `integrate-disclosures.mjs`
   before integration. Its current reviewed rules concern the 2026 period.
4. Run `node scripts/knowledge/integrate-disclosures.mjs` and
   `node scripts/knowledge/verify-disclosures.mjs`.
5. Build and run canonical/schema/public-parity validation before publication.

Pension tables have multi-row headings. Do not zip `thead` labels directly to
cells: the physical column order differs. `disclosure-normalizers.mjs` validates
the two table layouts and groups same-identity observations without discarding
them. Product identities exclude changing rates and asset values.

Card identity failures must not be approved by lowering the text threshold.
Some BC common-product pages direct users to the issuing bank for detailed
benefits. Insurance comparison tables and summary-document links are not a
substitute for reviewing all policy terms. Missing current listings are not
proof that a historical product has closed.

The machine-readable report in `evidence/disclosures` records remaining work;
the homepage does not display that internal task list.
