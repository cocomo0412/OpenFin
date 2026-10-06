import { DurableObject } from "cloudflare:workers";
import { consumeOwnerProof, expireOwnerProof } from "./owner-proof-replay.ts";

/** Inactive until an operator provisions a namespace and migration separately. */
export class OwnerProofReplayObject extends DurableObject<Env> {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST" || new URL(request.url).pathname !== "/consume") return new Response(null, { status: 404 });
    try {
      const raw = await request.text();
      if (raw.length > 256) return new Response(null, { status: 413 });
      const input = JSON.parse(raw) as { expiresAt?: unknown };
      const consumed = await consumeOwnerProof(this.ctx.storage, input?.expiresAt);
      return new Response(null, { status: consumed ? 204 : 409 });
    } catch {
      return new Response(null, { status: 503 });
    }
  }

  async alarm(): Promise<void> {
    await expireOwnerProof(this.ctx.storage);
  }
}
