// utils/redact.ts
const SENSITIVE_KEYS = [
  "password",
  "token",
  "authorization",
  "secret",
  "apiKey",
  "creditCard",
  "cvv",
];

export function redact(meta: Record<string, any>): Record<string, any> {
  if (!meta || typeof meta !== "object") return meta;
  const clone: Record<string, any> = Array.isArray(meta)
    ? [...meta]
    : { ...meta };
  for (const key of Object.keys(clone)) {
    if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
      clone[key] = "[REDACTED]";
    } else if (clone[key] && typeof clone[key] === "object") {
      clone[key] = redact(clone[key]); // recurse into nested objects
    }
  }
  return clone;
}
