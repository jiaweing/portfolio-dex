export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // Node gives each resolved address only 250ms to connect before trying the
  // next one, so slow networks fail server fetches with ETIMEDOUT even though
  // the host is reachable. Give connections a more forgiving window.
  const net = await import("node:net");
  net.setDefaultAutoSelectFamilyAttemptTimeout(2000);
}
