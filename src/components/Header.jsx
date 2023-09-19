'use client'

import { useAuth } from '@/hooks/auth';

import AuthLayout from './ui/AuthLayout';
import GuestLayout from './ui/GuestLayout';

export default function Header() {
  const { user, logout, get_permissions, permissions } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' });
  const perms = get_permissions();
  
  if (user) {
    return AuthLayout(user, logout);
  } else {
    return GuestLayout();
  }
}