import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { Eye, EyeOff } from 'lucide-react';

export const AuthForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });

  // Complete OAuth Logic with Redirect
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) alert(error.message);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignIn && formData.password !== formData.confirm) return alert("Passwords don't match");

    if (isSignIn) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      if (data.session) {
        navigate('/dashboard');
      } else {
        alert('Sign-in succeeded but the session is not ready yet. Please wait a moment and try again.');
      }
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.name, phone: formData.phone } },
    });
    if (error) {
      alert(error.message);
      return;
    }
    if (data.session) {
      navigate('/dashboard');
    } else {
      alert('Account created. Please check your inbox to confirm your email, then sign in again.');
    }
  };

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-[#d8d0c2] bg-[#f8f4eb] p-8 shadow-[0_24px_80px_-30px_rgba(17,17,17,0.35)] font-sans">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-[#7a746a]">Private Access</p>
      <div className="mb-6 flex items-center gap-2 rounded-full border border-[#d8d0c2] bg-white p-1">
        <button
          type="button"
          onClick={() => setIsSignIn(false)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${!isSignIn ? 'bg-[#171717] text-[#f8f4eb]' : 'text-[#7a746a]'}`}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => setIsSignIn(true)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${isSignIn ? 'bg-[#171717] text-[#f8f4eb]' : 'text-[#7a746a]'}`}
        >
          Sign In
        </button>
      </div>
      <h2 className="mb-6 text-2xl font-semibold tracking-[-0.02em] text-[#171717]">{isSignIn ? 'Welcome Back' : 'Create Account'}</h2>
      
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="mb-6 flex w-full items-center justify-center gap-3 rounded-full border border-[#171717] bg-white px-4 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#171717] hover:text-[#f8f4eb]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        {isSignIn ? 'Continue with Google' : 'Sign up with Google'}
      </button>

      <div className="relative mb-6 flex items-center py-2">
        <div className="flex-grow border-t border-[#d8d0c2]"></div>
        <span className="mx-4 flex-shrink-0 text-xs font-medium text-[#7a746a] uppercase tracking-wider">Or continue with email</span>
        <div className="flex-grow border-t border-[#d8d0c2]"></div>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none ring-0 placeholder:text-[#8b8478]"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none ring-0 placeholder:text-[#8b8478]"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {!isSignIn && (
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none ring-0 placeholder:text-[#8b8478]"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        )}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 pr-12 text-sm text-[#171717] outline-none ring-0 placeholder:text-[#8b8478]"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a746a] transition hover:text-[#171717]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {!isSignIn && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none ring-0 placeholder:text-[#8b8478]"
            onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
          />
        )}
        <button
          type="submit"
          className="w-full rounded-full bg-[#171717] px-4 py-3 text-sm font-semibold text-[#f8f4eb] transition hover:bg-[#2b2b2b]"
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};