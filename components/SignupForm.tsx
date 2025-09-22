"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { waitlistSchema } from '../lib/validations';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

type FormData = z.infer<typeof waitlistSchema>;

export default function SignupForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(waitlistSchema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSuccess(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let payload: Record<string, unknown> | null = null;
      try {
        payload = await res.json();
      } catch (jsonErr) {
        console.error('Failed to parse waitlist response', jsonErr);
      }

      const count = typeof payload?.count === 'number' ? payload.count : null;

      if (res.ok && payload?.success) {
        toast({ title: "You're on the list!", description: 'We will email you when the course opens.' });
        setSuccess("You're on the waitlist.");
        reset();
        if (count !== null) {
          window.dispatchEvent(new CustomEvent('waitlist:updated', { detail: count }));
        }
        return;
      }

      if (res.status === 409 && payload?.reason === 'duplicate') {
        toast({ title: 'Already joined', description: 'Looks like you are already on the waitlist.' });
        setSuccess('Thanks for being one of the first to join!');
        if (count !== null) {
          window.dispatchEvent(new CustomEvent('waitlist:updated', { detail: count }));
        }
        return;
      }

      const message = typeof payload?.error === 'string' ? payload.error : 'Something went wrong.';
      toast({ title: 'Something went wrong', description: message, variant: 'destructive' });
      console.error('Signup error', res.status, payload);
    } catch (err) {
      toast({ title: 'Network error', description: 'Please try again later.', variant: 'destructive' });
      console.error('Signup network error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
      <motion.h3 layout className="text-2xl font-semibold">
        Join the Waitlist
      </motion.h3>
      <motion.p layout className="text-mutedForeground mt-2">
        Get launch updates and an exclusive discount.
      </motion.p>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
        initial={false}
        animate={{ opacity: submitting ? 0.7 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" {...register('name')} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register('email')} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+44 7123 456789" {...register('phone')} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="consent" {...register('consent')} />
          <Label htmlFor="consent" className="text-sm text-mutedForeground">
            I agree to be contacted about the course and accept the{' '}
            <a className="underline" href="/privacy">
              Privacy Policy
            </a>
            .
          </Label>
        </div>
        {errors.consent && <p className="-mt-3 text-sm text-red-400">{errors.consent.message as string}</p>}
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: submitting ? 1 : 1.02 }}>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Join Waitlist'}
            </Button>
          </motion.div>
          <AnimatePresence>
            {success && (
              <motion.span
                key="success"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-emerald-300"
              >
                {success}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <p id="contact" className="text-xs text-mutedForeground">
          GDPR Notice: We process your data solely to provide course updates. You can request deletion at any time.
        </p>
      </motion.form>
    </motion.div>
  );
}
