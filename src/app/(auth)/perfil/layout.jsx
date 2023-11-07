import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './components/sidebar-nav';

export const metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
}

const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/perfil',
    rol: [
      'Admin',
      'Trainer',
      'Especialista',
      'Alumno',
    ],
  },
  {
    title: 'Ficha Técnica',
    href: '/perfil/ficha-tecnica',
    rol: [
      'Admin',
      'Trainer',
      'Alumno',
    ],
  },
  {
    title: 'Especialidades',
    href: '/perfil/especialidades',
    rol: [
      'Admin',
      'Especialista',
    ],
  },
];

export default function SettingsLayout({ children }) {
  return (
    <div className='space-y-6 p-10 pb-16 bg-background'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Perfil</h2>
        <p className='text-muted-foreground'>
          Administra tu cuenta y tus datos personales.
        </p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex-1 lg:max-w-2xl'>{children}</div>
      </div>
    </div>
  )
}