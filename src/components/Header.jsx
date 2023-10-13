'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

import AuthLayout from './ui/AuthLayout';
import GuestLayout from './ui/GuestLayout';

export default function Header() {
  const { user, logout } = useAuth({ middleware: 'guest' });
  //const perms = get_permissions();
  const router = useRouter();

  useEffect(() => {
    /* if (window.location.pathname != '/login' && window.location.pathname != '/registro') {
      axios.post('/api/permissions', { url: window.location.pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/')
          }
        });
    } */
  }, []);

  if (user) {
    return AuthLayout(user, logout);
  } else {
    return GuestLayout();
  }
}