'use client'
// src/app/page.tsx
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Clients } from './components/Clients';

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div className="text-center mt-24">
      <h1>Welcome, {session.user?.email}</h1>
      <Clients/>
      <button onClick={handleLogout} className="px-4 py-2 text-base">
        Logout
      </button>
    </div>
  );
}
