'use client'

import { useState } from "react";
import axios from "axios";
import Image from 'next/image';
import Link from "next/link";
import { toast } from "react-hot-toast";
import { hide, view, Logo } from '../../assets';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const registerUser = async (e) => {
       e.preventDefault()
       axios.post('/api/register', data)
       .then(() => toast.success('User has been registered!'))
       .catch(() => toast.error('Something went wrong!'))
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
                <h1 className="text-2xl font-semibold mb-6 text-center text-black">Register</h1>
                <form onSubmit={registerUser}>
                <div className="mb-4">
                    <label htmlFor="name_field" className="block mb-2 text-sm font-medium text-gray-600">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email_field" className="block mb-2 text-sm font-medium text-gray-600">
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
                    <label htmlFor="password_field" className="block mb-2 text-sm font-medium text-gray-600">
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
                    Register
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className='text-black'>
                        Already a member? <Link href="/Login">Login</Link>
                    </p>
                </div>
                </form>
            </div>
        </div>
      </>
    )
  }