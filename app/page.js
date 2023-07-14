'use client'
import { useEffect } from "react"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Logo } from '../app/assets'

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
    <div className='h-screen flex justify-center'>
      <div className="self-center">
        <Image
          src={Logo}
          width={300}
          height={300}
          alt="logo"
        />
      </div>
    </div>
  )
}