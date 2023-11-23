import Link from 'next/link';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import {
  Bone,
  Brain,
  ListIcon,
  Tablets,
  UtensilsCrossed
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from '@/lib/utils';

export default function Sidebar({ specialists, className, selectedBranch, setSelectedBranch }) {

  return (
    <div className={cn('pb-12', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Profesionales
          </h2>
          <div className='space-y-1'>
            <Button variant='secondary' className='w-full justify-start' onClick={() => setSelectedBranch('')}>
              <ListIcon className='mr-2 h-4 w-4' />
              Lista de profesionales
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Especialidad
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedBranch('Kinesiólogo')}>
              <Bone className='mr-2 h-4 w-4' />
              Kinesiólogo
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedBranch('Nutricionista')}>
              <UtensilsCrossed className='mr-2 h-4 w-4' />
              Nutricionista
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedBranch('Traumatólogo')}>
              <Tablets className='mr-2 h-4 w-4' />
              Traumatólogo
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedBranch('Psicólogo')}>
              <Brain className='mr-2 h-4 w-4' />
              Psicólogo
            </Button>
          </div>
        </div>
        <div className='py-2'>
          <h2 className='relative px-7 text-lg font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] to-[#FFD700]'>
            Top Ten
            <Badge variant="destructive" className='mx-4'>
              On Fire<span className='animate-pulse'>🔥</span>
            </Badge>
          </h2>
          <Separator className="w-[90%] mx-auto" />
          <ScrollArea className='px-1'>
            <div className='p-2'>
            {specialists?.map((specialist, i) => (
                <div className="flex items-center space-x-4 ml-2 h-full my-5" key={`${specialist.name}-${i}`}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    {specialist.name ? <p className='text-sm'>
                      {specialist.name}
                    </p> : <Skeleton className="h-4 w-[50px]" title='No hemos encontrado el nombre' />}
                    <Button className='primary' size={'sm'}><Link href={`./specialists/${specialist.id}`}>¡Contáctame!</Link></Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}