'use client'
import { useEffect } from "react"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default async function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/Dashboard') 
    } else {
      router.push('/Login')
    };
  });

  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}