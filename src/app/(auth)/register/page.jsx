'use client'

import Axios from '@/lib/axios';
import { useEffect, useState } from "react";
import Link from 'next/link';

import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/hooks/auth';

export default function RegisterPage() {
  const { register } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('');
  const [role, setRole] = useState({});

  const getRoles = async () => {
    const res = await Axios.get('/api/roles')
      .then((res) => {
        setRoles(res.data.data);
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      rol_id: role.id,
      setErrors,
      setStatus
    })
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <section className="py-10 lg:py-10 bg-background min-h-[84vh]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg py-16 px-10 text-center sm:px-12 md:px-[60px]">

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex ml-1">Nombre</Label>
                  <Input
                    type="text"
                    placeholder="Juan Perez"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">

                  <Label htmlFor="email" className="flex ml-1">Email</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex ml-1">Contraseña</Label>
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="flex ml-1">Confirmar Contraseña</Label>
                  <Input
                    type="password"
                    placeholder="********"
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="rol" className="flex ml-1">Rol</Label>
                  <Select 
                    onValueChange={(e) => setRole({ id: e, name: '' })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder='Seleccione uno' />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => {
                        return (
                          <SelectItem key={role.id} value={`${role.id}`}>
                            {role.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href="/login"
                    className="underline text-sm text-gray-400 hover:text-white"
                  >
                    Ya estás registrado? Logueate
                  </Link>
                  <Button type="submit" variant="outline">Registrarse</Button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}