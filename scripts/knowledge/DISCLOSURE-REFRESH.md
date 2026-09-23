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
4. Run `python scripts/knowledge/collect-tax-calendar.py` to retrieve the NTS
   calendars and VAT guide used by the explicit 2026 deadline reviews. Then run
   `node scripts/knowledge/integrate-disclosures.mjs` and
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

## Recovery adapters

`--retry-failed-cards` preserves successful receipts and retries only failed
identities. Woori uses the public product JSON endpoint with its documented
page headers; both returned product code and name must match. An incorrect
legacy OHA CHECK URL is replaced with the verified code 102716. Lotte mobile
shells are mapped to their official desktop disclosures. Hana's renamed
product is accepted only after matching its code in the official catalog.
No login or API key is needed. Session/response-header metadata is not exported.

Run `--insurance-indexes` before `collect-policy-documents.py` (dependency:
`pypdfium2`). Only links explicitly labelled 약관 with a current effective
period are selected. PDF parsing is sequential because PDFium is not
thread-safe. Raw PDFs and extracted text stay in the ignored cache; exports
carry document links, version dates, page counts and hashes. These receipts
do not mean that all clauses or product variants have passed semantic review.

Collector regression checks: `python tests/knowledge/test_disclosure_collectors.py`.

Local-tax and filing/deadline reviews are explicitly listed in the adjacent
`*-reviews.mjs` modules. Integration stores the actual legal article excerpts,
retains reviewed statutory exceptions and synchronizes Markdown descriptions.
The May/July 2026 weekend deadline corrections additionally retain NTS calendar
receipts. Do not roll these fixed dates forward by replacing their year.

`disclosure-receipts.mjs` removes anonymous session identifiers from public
source URLs without changing the raw-response checksum or product identifiers.
`verify-disclosures.mjs` checks public receipts, canonical/disclosure parity and
the presence of legal evidence for the explicit review sets.

The BC leaflet candidate report is an intermediate identity-review artifact.
An old leaflet linked by today's index is not proof of current contractual
benefits, and a credit-card leaflet must not be applied to a same-name check card.
