'use client';

import { useRegisterMutation } from '@/redux/slice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from 'react';

const Register = () => {
  const router = useRouter();

  const [register] = useRegisterMutation({ fixedCacheKey: 'register' });

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response: any = await register({ email, password });
    if (response?.error?.data?.error) {
      setError(response?.error?.data?.error);
    } else if (response?.data?.token) {
      // Redirect to notes
      localStorage.setItem('token', JSON.stringify(response?.data?.token));
      router.push('/notes');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Register
        </h2>
        <label
          className="block text-red-700 text-sm font-bold mb-2 text-center"
          htmlFor="email"
        >
          {error}
        </label>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <p>
              Already have an account?<Link href="/auth/login">login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
