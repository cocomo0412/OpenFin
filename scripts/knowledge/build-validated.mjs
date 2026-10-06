import { ROOT } from './common.mjs';
import { transactionalEntry, runTrackedStage } from './refresh-transaction.mjs';

await transactionalEntry(import.meta.url);
for (const stage of ['build-decision-snapshots', 'review-decision-offers', 'validate-decision-receipts', 'promote-candidates', 'build', 'validate', 'validate-rule-facts']) {
  const result = await runTrackedStage(process.execPath, [`scripts/knowledge/${stage}.mjs`], { cwd: ROOT, env: process.env });
  process.stdout.write(result.stdout); process.stderr.write(result.stderr);
  if (result.status !== 0) process.exit(result.status ?? 1);
}
