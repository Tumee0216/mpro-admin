'use client'

import { useEffect } from "react"
import { Sidebar, Header } from '../../components'
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { CardList } from '../../components/CardList';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status != 'authenticated') {
       router.push('/Login') 
    }
  })

  return (
    <Sidebar>
        <div className='bg-gray-100 min-h-screen'>
            <Header />
            <div className="mt-6">
              <CardList/>
            </div>
        </div>
    </Sidebar>
  )
}

export default Dashboard