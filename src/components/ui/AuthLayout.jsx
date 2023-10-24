import * as React from 'react'
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Container } from './container';
import { ThemeToggle } from './ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from './navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from './sheet';
import { Menu } from 'lucide-react';
import ProfileButton from './ProfileButton';


const components = [
  {
    title: 'Rutinas',
    href: '/student_routines',
    perms: ['Alumno'],
    description:
      'Ver rutinas asignadas por el personal trainer.',
  },
  {
    title: 'Calendario',
    href: '/calendario',
    perms: ['Trainer'],
    description:
      'Ver calendario con el cronograma de rutinas asignadas por todos los profesionales.',
  },
  {
    title: 'Progreso',
    href: '/metricas',
    perms: ['Alumno'],
    description:
      'Ver progreso de los objetivos basados en los ejercicios especificados.',
  },
  {
    title: 'Mis Pago',
    href: '/payment',
    perms: ['Alumno'],
    description: 'Generar mis pagos.',
  },
  {
    title: 'Pagos',
    href: '/payments',
    perms: ['Trainer', 'Alumno'],
    description:
      'Ver pagos realizados y pendientes de los planes asignados por los profesionales.',
  },
  {
    title: 'Alumnos',
    href: '/trainer_request',
    perms: ['Trainer'],
    description:
      'Ver eventos que se realizarán y que pueden ser de interés para que te inscribas!',
  },
]



const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

const AuthLayout = (user, logout, role) => {
  return (
    <header className='sm:flex sm:justify-between py-3 px-4 border-b bg-background'>
      <Container>
        <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>

          <div className='flex items-center'>
            <Sheet>
              <SheetTrigger>
                <Menu className='h-6 md:hidden w-6' />
              </SheetTrigger>
              <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
                <nav className='flex flex-col gap-4'>
                  {components.filter((component) => {
                    if(component.perms.includes(role)){
                      <Link
                      key={component.title}
                      href={component.href}
                      className='block px-2 py-1 text-lg'
                    >
                      {component.title}
                    </Link>
                    }
                  }
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href='/' className='ml-4 lg:ml-0'>
              <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#008080]'>
                Ehwaz
              </h1>
            </Link>
          </div>

          <nav className='mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Profesionales</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                      <li className='row-span-3'>
                        <NavigationMenuLink asChild>
                          <a
                            className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                            href='/'
                          >
                            <div className='h-6 w-6' />
                            <div className='mb-2 mt-4 text-lg font-medium'>

                            </div>
                            <p className='text-sm leading-tight text-muted-foreground'>
                              El mejor profesional está acá.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href='/trainers' title='Personal Trainers'>
                        Ver todos los Personal Trainers
                      </ListItem>
                      <ListItem href='/' title='Profesionales'>
                        Ver todos los profesionales
                      </ListItem>
                      <ListItem href='/' title='Algo más'>
                        Ver algo más
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Planes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className='flex items-center'>
            <ProfileButton User={user} logout={logout} />
            <ThemeToggle />
          </div>

        </div>
      </Container>
    </header>
  )
}

export default AuthLayout;