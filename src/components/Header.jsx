'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

import AuthLayout from './ui/AuthLayout';
import GuestLayout from './ui/GuestLayout';

export default function Header() {
  const { user, logout } = useAuth({ middleware: 'guest' });
  //const perms = get_permissions();
  const router = useRouter();

  const [role, setRole] = useState(null);
  
  useEffect(()=>{
    axios.get('/api/get-role')
    .then((res) => {
      setRole(res.data.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  if (user) {
    return AuthLayout(user, logout, role);
  } else {
    return GuestLayout();
  }
}