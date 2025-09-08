import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitlistSchema, normalizePhone } from '../lib/validations';
import * as rate from '../lib/rateLimit';

describe('validation', () => {
  it('accepts valid input', () => {
    const data = { name: 'John Doe', email: 'john@example.com', phone: '+44 7123 456789', consent: true };
    const parsed = waitlistSchema.parse(data);
    expect(parsed.email).toBe('john@example.com');
  });
  it('rejects missing consent', () => {
    const data = { name: 'John', email: 'john@example.com', phone: '+1 222 333 4444', consent: false } as any;
    expect(() => waitlistSchema.parse(data)).toThrow();
  });
  it('normalizes phone', () => {
    expect(normalizePhone(' 00 44 (0)7123-456789 ')).toBe('+4407123456789');
  });
});

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    rate.resetRateLimit();
    vi.resetModules();
  });

  it('responds 200 on success', async () => {
    vi.doMock('@\/lib/db', () => ({
      ensureDb: async () => {},
      prisma: {
        waitlist: {
          create: vi.fn().mockResolvedValue({ id: '1' }),
          count: vi.fn().mockResolvedValue(1),
        },
      },
    }));
    const { POST } = await import('../app/api/waitlist/route');
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Jane', email: 'jane@example.com', phone: '+123456789', consent: true }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.count).toBe(1);
  });

  it('responds 409 on duplicate', async () => {
    vi.doMock('@\/lib/db', () => ({
      ensureDb: async () => {},
      prisma: {
        waitlist: {
          create: vi.fn().mockRejectedValue({ code: 'P2002' }),
          count: vi.fn().mockResolvedValue(1),
        },
      },
    }));
    const { POST } = await import('../app/api/waitlist/route');
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Jane', email: 'jane@example.com', phone: '+123456789', consent: true }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });

  it('rate limits excessive requests', async () => {
    vi.mocked = vi.mocked || ((fn: any) => fn);
    const reqFactory = () =>
      new Request('http://localhost/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Jane', email: `${Math.random()}@example.com`, phone: '+1', consent: true }),
      });

    vi.doMock('@\/lib/db', () => ({
      ensureDb: async () => {},
      prisma: {
        waitlist: {
          create: vi.fn().mockResolvedValue({ id: '1' }),
          count: vi.fn().mockResolvedValue(1),
        },
      },
    }));
    const { POST } = await import('../app/api/waitlist/route');

    for (let i = 0; i < 5; i++) {
      const res = await POST(reqFactory());
      expect(res.status === 200 || res.status === 400).toBeTruthy();
    }
    const res = await POST(reqFactory());
    expect(res.status).toBe(429);
  });
});
