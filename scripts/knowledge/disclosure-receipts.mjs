// Public provenance must retain product identity, not anonymous browser sessions.
export function publicReceipt(receipt) {
  const cleanUrl = value => {
    if (typeof value !== 'string') return value;
    const url = new URL(value.replace(/;(?:cohsessionid|jsessionid)=[^/?#;]+/ig, ''));
    for (const key of [...url.searchParams.keys()]) {
      if (/^(?:cohsessionid|jsessionid|sessionid|session_id|csrf|csrftoken)$/i.test(key)) url.searchParams.delete(key);
    }
    return url.href;
  };
  return {...receipt, url: cleanUrl(receipt.url), ...(receipt.final_url ? {final_url: cleanUrl(receipt.final_url)} : {})};
}
