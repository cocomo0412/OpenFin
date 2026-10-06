// One deadline covers response headers and the complete (bounded) body.
export async function fetchSourceResponse(url, options, { timeoutMs, maxBodyBytes, fetchImpl = fetch }) {
  const controller = new AbortController();
  let timer, reader;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      const error = new DOMException('Source request timed out', 'AbortError');
      controller.abort(error);
      reject(error);
    }, timeoutMs);
  });
  try {
    const response = await Promise.race([fetchImpl(url, { ...options, signal: controller.signal }), deadline]);
    const bodyResult = { body: '', truncated: false, bytes: 0 };
    if (options.method !== 'HEAD' && response.ok && response.body) {
      reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await Promise.race([reader.read(), deadline]);
        if (done) break;
        const remaining = maxBodyBytes - bodyResult.bytes;
        const chunk = value.subarray(0, remaining);
        bodyResult.body += decoder.decode(chunk, { stream: true });
        bodyResult.bytes += chunk.byteLength;
        if (value.byteLength > remaining) { bodyResult.truncated = true; break; }
      }
      bodyResult.body += decoder.decode();
    }
    return { status: response.status, ok: response.ok, headers: response.headers, bodyResult };
  } finally {
    clearTimeout(timer);
    // Abort also closes bodies for HEAD/error statuses. Never wait indefinitely
    // for cancellation of an already stalled/custom stream.
    controller.abort();
    if (reader) { reader.cancel().catch(() => {}); reader.releaseLock(); }
  }
}
