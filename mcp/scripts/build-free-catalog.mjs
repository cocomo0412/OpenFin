import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const source = new URL("../../docs/opentax/korea-tax-ontology-2026.json", import.meta.url);
const raw = readFileSync(source);
const data = JSON.parse(raw);
const items = [...data.items, ...(data.reference_items ?? [])].map((item) => ({
  id: item.id, title: item.title, type: item.type,
  description: String(item.description ?? "").slice(0, 1400),
  status: item.abolition_status ?? item.status ?? "unknown",
  basis_year: item.basis_year ?? null,
  source_urls: (item.source_urls ?? []).filter(url => /^https?:\/\//.test(url)).slice(0, 8),
  source_ids: (item.sources ?? []).slice(0, 12),
  source_basis_dates: (item.source_basis_dates ?? []).slice(0, 8),
  freshness: "not_revalidated",
}));
if (items.length > 500 || new Set(items.map(x => x.id)).size !== items.length) throw new Error("Catalog size or duplicate ID check failed");
const catalog = { edition: "free-tax-pilot", domain: "tax", source_version: data.version,
  basis_date: data.basis_date, source_sha256: createHash("sha256").update(raw).digest("hex"), items };
const output = JSON.stringify(catalog);
if (Buffer.byteLength(output) > 600_000) throw new Error("Free catalog exceeds its bounded size");
const destination = new URL("../src/free-catalog.json", import.meta.url);
if (!existsSync(destination) || readFileSync(destination, "utf8") !== output + "\n") writeFileSync(destination, output + "\n");
console.log(`Free tax catalog: ${items.length} records, ${Buffer.byteLength(output)} bytes`);
