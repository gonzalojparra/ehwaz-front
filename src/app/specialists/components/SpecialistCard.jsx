import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export default function SpecialistCard({
  specialist,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={`/specialists/${specialist.id}`}>
            <div className='overflow-hidden rounded-md'>
              <Image
                src={specialist.profile_picture_url}
                alt={specialist.name}
                width={width}
                height={height}
                quality={100}
                className={cn(
                  'h-auto w-auto object-cover transition-all hover:scale-105 cursor-pointer', aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
                )}
              />
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-40'>
          <ContextMenuItem>Contactar</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Más información</ContextMenuSubTrigger>
            {/* <ContextMenuSubContent className='w-48'>
              <ContextMenuItem>Nueva playlist na q ver</ContextMenuItem>
              <ContextMenuSeparator />
              {trainers.map((trainer) => (
                <ContextMenuItem key={trainer.name}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='mr-2 h-4 w-4'
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3' />
                  </svg>
                  {trainer.name}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent> */}
          </ContextMenuSub>
          <ContextMenuSeparator />
        </ContextMenuContent>
      </ContextMenu>
      <div className='space-y-1 text-sm'>
        <h3 className='font-medium leading-none'>{specialist.name} {specialist.last_name}</h3>
        <p className='text-xs text-muted-foreground'>{specialist.branch}</p>
      </div>
    </div>
  )
}