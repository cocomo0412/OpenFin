/** Server-only RPC binding contract; never accepted from a tool argument.
 * Implementations must atomically insert-if-absent across every consumer and
 * retain consumed keys until expiresAt (Unix seconds). A backend failure must
 * reject, not return true. An eventually consistent get/put store is inadequate.
 * No backend is provisioned by the free Worker configuration.
 */
export interface OwnerProofReplayStore {
  consume(input: { key: string; expiresAt: number }): Promise<boolean>;
}

declare global {
  interface Env {
    OWNER_PILOT_REPLAY_STORE?: Pick<DurableObjectNamespace, "idFromName" | "get">;
    OPENFIN_DIAGNOSTICS_ENABLED?: string;
  }
}
