'use client'
// src/app/login/page.tsx
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col w-72 mx-auto mt-24">
      <h2>Login:</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2.5 p-2 text-base"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2.5 p-2 text-base"
      />
      <button onClick={handleLogin} className="px-4 py-2 text-base">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className='text-center'>
        <a href="/signup">Sign Up Page</a>
      </div>
    </div>
  );
}
