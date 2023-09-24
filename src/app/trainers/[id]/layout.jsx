import { Suspense } from 'react';

import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';

import Loading from './loading';

export default function Layout({ children, className }) {
  return (
    <div className={cn('bg-background min-h-[84vh]', className)}>
      <Suspense fallback={<Loading />}>
        <Container>
          {children}
        </Container>
      </Suspense>
    </div>
  )
}