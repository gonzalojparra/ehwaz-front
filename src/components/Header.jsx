'use client'

import { useAuth } from '@/hooks/auth';

import AuthLayout from './ui/AuthLayout';
import GuestLayout from './ui/GuestLayout';

export default function Header() {
  const { user, logout } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' });

  if (user) {
    return AuthLayout(user, logout);
  } else {
    return GuestLayout();
  }
}