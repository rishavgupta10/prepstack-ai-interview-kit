import dns from "node:dns/promises";
import { env } from "node:process";


const PRIVATE_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
]);

function isPrivateIp(ip: string): boolean {
  if (
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.")
  ) {
    return true;
  }

  const octets = ip.split(".").map(Number);

  if (octets.length === 4) {
    const [a, b] = octets;

    if (a === 172 && b >= 16 && b <= 31) {
      return true;
    }

    if (a === 169 && b === 254) {
      return true;
    }
  }

  return false;
}

export async function validateCompanyUrl(url: string): Promise<void> {
  const parsedUrl = new URL(url);

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Company URL must use HTTP or HTTPS.");
  }

  if (env.isProd !== "production") {
    return;
  }

  const hostname = parsedUrl.hostname.toLowerCase();

  if (PRIVATE_HOSTNAMES.has(hostname)) {
    throw new Error("Private or loopback company URLs are not allowed.");
  }

  const addresses = await dns.lookup(hostname, { all: true });

  if (addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error("Company URL resolves to a private or loopback address.");
  }
}
