import { z } from 'zod';

export const waitlistSchema = z
  .object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    phone: z
      .string()
      .min(6)
      .max(20)
      .regex(/^[+()\-\s\d]+$/i, 'Invalid phone number'),
    consent: z.literal(true, {
      errorMap: () => ({ message: 'Consent is required' }),
    }),
  })
  .strip();

export function normalizePhone(input: string) {
  const trimmed = input.trim();
  // Keep leading + and digits, remove spaces, dashes, parentheses
  const cleaned = trimmed
    .replace(/[()\s-]/g, '')
    .replace(/^00/, '+');
  return cleaned;
}

