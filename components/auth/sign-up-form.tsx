'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useAuthDialog } from '@/components/auth/auth-provider';
import { FormInput } from '@/components/auth/form-input';
import { createClient } from '@/lib/supabase/client';

const signUpSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { setTab } = useAuthDialog();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpValues) => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setEmailSent(true);
    toast.success('Check your email to verify your account!');
  };

  if (emailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-6 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A87C]/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8 text-[#C9A87C]"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <div>
          <h3
            className="mb-1 font-medium text-[#2C2416] text-lg"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Check your email
          </h3>
          <p
            className="text-[#8B7355] text-sm leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            We sent a verification link.
            <br />
            Click it to activate your account.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setTab('sign-in')}
          className="mt-2 font-medium text-[#C9A87C] text-sm transition-colors hover:text-[#A88B63]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Back to Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Email"
        type="email"
        placeholder="your@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <FormInput
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2C2416] px-4 py-3 font-medium text-sm text-white tracking-tight transition-all duration-200 hover:bg-[#3D3425] disabled:opacity-60"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Create Account
      </button>
    </form>
  );
}
