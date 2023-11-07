'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import axios from '@/lib/axios';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export function SidebarNav({ className, items, ...props }) {
  const [rol, setRol] = useState(null);
  const pathname = usePathname();

  const obtenerRol = async () => {
    await axios.get('api/get-role')
      .then((res) => {
        setRol(res.data.data[0]);
        //console.log(res.data.data[0]);
      })
      .catch((e) => {
        console.log(e.errors);
      });
  }

  useEffect(() => {
    obtenerRol();
  }, []);

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => {
        if (item.rol.includes(rol)) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
                'justify-start'
              )}
            >
              {item.title}
            </Link>
          );
        }
        return null;
      })}
    </nav>
  )
}