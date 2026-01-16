type SupabaseWaitlistConfig = {
  url: string;
  serviceRoleKey: string;
  table: string;
};

export class SupabaseWaitlistRequestError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'SupabaseWaitlistRequestError';
    this.status = status;
    this.code = code;
  }
}

export function getSupabaseWaitlistConfig(): SupabaseWaitlistConfig {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase configuration. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  }

  return {
    url,
    serviceRoleKey,
    table: process.env.SUPABASE_WAITLIST_TABLE || 'waitlist',
  };
}

function supabaseHeaders(config: SupabaseWaitlistConfig) {
  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
  };
}

function supabaseTableUrl(config: SupabaseWaitlistConfig) {
  return new URL(`/rest/v1/${config.table}`, config.url);
}

export async function fetchSupabaseWaitlistCount(config: SupabaseWaitlistConfig) {
  const endpoint = supabaseTableUrl(config);
  endpoint.searchParams.set('select', 'id');
  endpoint.searchParams.set('head', 'true');

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      ...supabaseHeaders(config),
      Prefer: 'count=exact',
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new SupabaseWaitlistRequestError(`Supabase count failed (${response.status})`, response.status);
  }

  const contentRange = response.headers.get('content-range');
  if (!contentRange) {
    throw new SupabaseWaitlistRequestError('Supabase count missing content-range header', response.status);
  }

  const totalPart = contentRange.split('/').pop();
  const count = totalPart ? Number(totalPart) : Number.NaN;
  if (Number.isNaN(count)) {
    throw new SupabaseWaitlistRequestError(`Supabase count invalid header: ${contentRange}`, response.status);
  }

  return count;
}

type WaitlistPayload = {
  name: string;
  email: string;
  phone: string;
  consent: true;
};

export async function insertSupabaseWaitlistRow(config: SupabaseWaitlistConfig, payload: WaitlistPayload) {
  const endpoint = supabaseTableUrl(config);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...supabaseHeaders(config),
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify([payload]),
  });

  if (!response.ok) {
    let details: { message?: string; code?: string } | undefined;
    try {
      details = await response.json();
    } catch {
      // ignore JSON parse error
    }
    throw new SupabaseWaitlistRequestError(
      details?.message || `Supabase insert failed (${response.status})`,
      response.status,
      details?.code,
    );
  }
}

