"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { waitlistSchema } from '../lib/validations';
import { z } from 'zod';
import { useState } from 'react';
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
      let json: any = null;
      try {
        json = await res.json();
      } catch (e) {
        const text = await res.text().catch(() => '');
        json = { error: text || 'Unexpected response' };
      }
      if (res.ok) {
        toast({ title: 'You’re on the list! 🎉' });
        setSuccess('Thanks! You’re on the waitlist.');
        reset();
        // Update the stat counter by dispatching an event
        window.dispatchEvent(new CustomEvent('waitlist:updated', { detail: json.count }));
      } else {
        const message = typeof json?.error === 'string' ? json.error : 'Something went wrong';
        toast({ title: 'Oops', description: message, variant: 'destructive' });
        // Log for debugging
        // eslint-disable-next-line no-console
        console.error('Signup error', res.status, json);
      }
    } catch (e) {
      toast({ title: 'Network error', description: 'Please try again later', variant: 'destructive' });
      // eslint-disable-next-line no-console
      console.error('Signup network error', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold">Join the Waitlist</h3>
      <p className="text-mutedForeground mt-2">Get launch updates and an exclusive discount.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
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
            <a className="underline" href="/privacy">Privacy Policy</a>.
          </Label>
        </div>
        {errors.consent && <p className="-mt-3 text-sm text-red-400">{errors.consent.message as string}</p>}
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Join Waitlist'}
          </Button>
          {success && <span className="text-emerald-300">{success}</span>}
        </div>
        <p id="contact" className="text-xs text-mutedForeground">
          GDPR Notice: We process your data solely to provide course updates. You can request
          deletion at any time.
        </p>
      </form>
    </div>
  );
}
