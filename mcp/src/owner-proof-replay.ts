import type { OwnerProofReplayStore } from "./types/runtime-bindings.ts";

/** Each hashed JTI is routed to the same Durable Object across consumers. */
export function ownerProofReplayStore(namespace: Env["OWNER_PILOT_REPLAY_STORE"]): OwnerProofReplayStore | undefined {
  if (!namespace) return undefined;
  return {
    async consume({ key, expiresAt }) {
      if (!/^[a-f0-9]{64}$/.test(key)) return false;
      const stub = namespace.get(namespace.idFromName(key));
      const response = await stub.fetch(new Request("https://owner-proof.internal/consume", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ expiresAt }), signal: AbortSignal.timeout(5_000),
      }));
      return response.status === 204;
    },
  };
}

/** Actual backend algorithm. The storage transaction is the atomic boundary. */
export async function consumeOwnerProof(storage: Pick<DurableObjectStorage, "transaction">, expiresAt: unknown, now = Date.now()): Promise<boolean> {
  const seconds = Math.floor(now / 1000);
  if (typeof expiresAt !== "number" || !Number.isInteger(expiresAt) || expiresAt <= seconds || expiresAt > seconds + 900) return false;
  return storage.transaction(async txn => {
    const existing = await txn.get<number>("expires_at");
    if (existing !== undefined && existing > seconds) return false;
    await txn.put("expires_at", expiresAt);
    await txn.setAlarm(expiresAt * 1000);
    return true;
  });
}

export async function expireOwnerProof(storage: Pick<DurableObjectStorage, "transaction">, now = Date.now()): Promise<void> {
  await storage.transaction(async txn => {
    const expiresAt = await txn.get<number>("expires_at");
    if (expiresAt === undefined) return;
    if (expiresAt * 1000 <= now) await txn.delete("expires_at");
    else await txn.setAlarm(expiresAt * 1000);
  });
}
