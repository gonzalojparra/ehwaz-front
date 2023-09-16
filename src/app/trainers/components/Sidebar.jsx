import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from "@/components/ui/skeleton"
import { trainers } from '../data/trainer';
import { ListIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Sidebar({ trainers, className }) {
  return (
    <div className={cn('pb-12', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Trainers
          </h2>
          <div className='space-y-1'>
            <Button variant='secondary' className='w-full justify-start'>
              <ListIcon className='mr-2 h-4 w-4' />
              Lista de entrenadores
            </Button>
            {/*  <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <rect width='7' height='7' x='3' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='14' rx='1' />
                <rect width='7' height='7' x='3' y='14' rx='1' />
              </svg>
              Buscar
            </Button> */}
          </div>
        </div>
        <div className='py-2'>
          <h2 className='relative px-7 text-lg font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#3b863b] to-[#12ffc4]'>
            Top Ten <Badge variant="destructive" className='mx-4'>On Fire 🔥</Badge>
          </h2>
          <Separator className="w-[90%] mx-auto" />
          <ScrollArea className='px-1'>
            <div className='p-2'>
              {trainers?.map((trainer, i) => (
                <div className="flex items-center space-x-4 ml-2 h-full my-5" key={`${trainer.name}-${i}`}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    {trainer.name?<p className='text-sm'>
                      {trainer.name}
                    </p>:<Skeleton className="h-4 w-[50px]" title='No hemos encontrado el nombre'/>}
                  <Button className='primary' size={'sm'}><Link href={`./trainers/${trainer.id}`}>¡Contáctame!</Link></Button>
                  </div>
                </div>
              ))}
            </div>
           {/*  <div className='space-y-1 p-2'>
              {trainers?.map((trainer, i) => (
                <Button
                  key={`${trainer.name}-${i}`}
                  variant='ghost'
                  className='w-full justify-start font-normal'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='mr-2 h-4 w-4'
                  >
                    <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
                    <circle cx='12' cy='7' r='4' />
                  </svg>
                  {trainer.name}
                </Button>
              ))}
            </div> */}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}