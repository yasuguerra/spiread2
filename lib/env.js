// Centralized environment variable validation
// Minimal custom validation (could swap to zod later without touching callers)

function requireEnv(name, { optional = false, fallback = undefined } = {}) {
  const val = process.env[name] ?? fallback;
  if ((val === undefined || val === null || val === '') && !optional) {
    throw new Error(`[env] Missing required environment variable: ${name}`);
  }
  return val;
}

export const ENV = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Spiread',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  SUPABASE_URL: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  SUPABASE_ANON_KEY: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  AI_ENABLED: (process.env.AI_ENABLED || 'false').toLowerCase() === 'true',
  AI_MAX_CALLS_PER_DAY: parseInt(process.env.AI_MAX_CALLS_PER_DAY || '10', 10),
  AI_MAX_TOKENS_PER_MONTH: parseInt(process.env.AI_MAX_TOKENS_PER_MONTH || '100000', 10),
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  EMERGENT_LLM_KEY: process.env.EMERGENT_LLM_KEY,
  REDIS_URL: process.env.UPSTASH_REDIS_REST_URL,
  REDIS_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  CORS_ORIGINS: (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
};

export function getAllowedOrigins() {
  if (!ENV.CORS_ORIGINS.length) return ['*'];
  return ENV.CORS_ORIGINS;
}

export function isOriginAllowed(origin) {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  if (allowed.includes('*')) return true;
  return allowed.some(a => origin === a || (a.startsWith('*.') && origin.endsWith(a.slice(1))));
}
