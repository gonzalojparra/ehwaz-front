'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import axios from '@/lib/axios';

export const Permisos = async () => {
  const router = useRouter();
  try {
    const response = await axios.post('/api/permissions');
    if (response.data.data === false) {
      router.push('/');
    }
  } catch (error) {
    router.push('/');
  }
}