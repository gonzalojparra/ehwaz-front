'use client'

import { useAuth } from '@/hooks/auth';

import AuthLayout from './ui/AuthLayout';
import GuestLayout from './ui/GuestLayout';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' });
  //const perms = get_permissions();
  const router = useRouter();

  useEffect(()=>{
    if(window.location.pathname != '/login' && window.location.pathname != '/registro'){
      axios.post('/api/permissions', {url: window.location.pathname}).then((response)=>{
        if(response.data.data == false){
            router.push('/')
        }
      });
    }
  }, [])

  
  if (user) {
    return AuthLayout(user, logout);
  } else {
    return GuestLayout();
  }
}