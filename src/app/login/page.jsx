'use client'

import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import InputError from '@/components/ui/InputError';

export default function LoginPage() {
  const searchParams = useSearchParams();

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/'
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const reset = searchParams.get('reset') || '';
    if (reset.length > 0 && errors.length === 0) {
      setStatus(atob(reset));
    } else {
      setStatus(null);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  }

  return (
    <section className="py-10 lg:py-10">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg py-16 px-10 text-center sm:px-12 md:px-[60px]">

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className='flex ml-1'>Email</Label>
                  <Input
                    type="email"
                    placeholder="ejemplo@email.com"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Password */}
                <div className="space-y-4">
                  <Label htmlFor="password" className='flex ml-1'>Contraseña</Label>
                  <Input
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Remember */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shouldRemember"
                      name="remember"
                      onChange={() => setShouldRemember(true)}
                    />
                    <div className="space-y-2">
                      <label htmlFor="shouldRemember" className="text-sm font-medium">
                        Recordarme
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Link
                    href="/forgot-password"
                    className="underline text-sm text-gray-400 hover:text-white"
                  >
                    Olvidaste tu contraseña?
                  </Link>
                  <Button type="submit" variant="outline">Log In</Button>
                </div>
              </form>

              <div className="space-y-4 mt-4">
                <InputError messages={errors.email} />
                <InputError messages={errors.password} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}