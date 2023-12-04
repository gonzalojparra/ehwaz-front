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
  const [extraData, setExtraData] = useState(null);

  useEffect(() => {
    axios.get('/api/get-role')
      .then((res) => {
        setRole(res.data.data[0]);
        getExtraData(res.data.data[0]);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [user])

  const getExtraData = async (role) => {
    const res = await axios.post('/api/get_extra_data', {
      role: role
    });
    setExtraData(res.data.data);
  }

  if (user && role) {
    return AuthLayout(user, logout, role, extraData);
  } else {
    return GuestLayout();
  }
}