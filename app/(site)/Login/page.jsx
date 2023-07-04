'use client'

import { useState, useEffect } from "react"
import { signIn, useSession } from 'next-auth/react'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Image from 'next/image';
import Link from "next/link";
import { hide, view, Logo } from '../../assets';

export default function Login() {
    const session = useSession();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    
    useEffect(() => {
        if (session?.status === 'authenticated') {
           router.push('/Dashboard') 
        }
    })

    const loginUser = async (e) => {
        e.preventDefault()
        signIn('credentials',
         {...data, redirect: false
        })
        .then((callback) => {
            if (callback?.error) {
                toast.error(callback.error)
            }
            if(callback?.ok && !callback?.error) {
                toast.success('Logged in successfully!')
            }
        })
    }
    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <div className='mb-6 flex justify-center'>
                    <Image
                        src={Logo}
                        width={180}
                        height={180}
                        alt="logo"
                    />
                </div>
                {/* <h1 className="text-2xl font-semibold mb-6 text-center text-black">Login</h1> */}
                <form method="post" action="/api/auth/callback/credentials" onSubmit={loginUser}>
                    <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={e => setData({ ...data, email: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                    </div>
                    <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <div className="relative">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={e => setData({ ...data, password: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                        />
                        <button
                        type="button"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        onClick={handleTogglePassword}
                        >
                        {showPassword ? (
                            <Image
                                src={hide}
                                width={20}
                                height={20}
                                alt="hide"
                            />
                        ) : (
                            <Image
                                src={view}
                                width={20}
                                height={20}
                                alt="view"
                            />
                        )}
                        </button>
                    </div>
                    </div>
                    <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                    </div>
                    <div className="mt-4 text-center">
                        <p className='text-black'>
                        Not a member? <Link href="/Register">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
  }