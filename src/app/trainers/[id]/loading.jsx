import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col md:flex-row p-8'>
      <div className='flex-none'>
        <Skeleton className='rounded-lg w-[400px] h-[600px]' />
      </div>
      <div className='flex-grow px-4'>
        <div className='flex flex-col'>
          <div className='flex flex-wrap justify-between p-8 pt-6'>
            <div className='w-full md:w-1/2'>
              <Skeleton className='m-2 hover:scale-105 transition-transform cursor-pointer p-12' />
            </div>
            <div className='w-full md:w-1/2'>
              <Skeleton className='m-2 hover:scale-105 transition-transform cursor-pointer p-12' />
            </div>
            <div className='w-full md:w-1/2'>
              <Skeleton className='m-2 hover:scale-105 transition-transform cursor-pointer p-12' />
            </div>
            <div className='w-full md:w-1/2'>
              <Skeleton className='m-2 hover:scale-105 transition-transform cursor-pointer p-12' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}