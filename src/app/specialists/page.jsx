'use client'

import { useEffect, useState } from 'react';
import { useSearchSpecialist } from '@/context/SearchSpecialistContext';

import { getSpecialists } from '@/modules/specialists';

import Sidebar from './components/Sidebar';
import SpecialistCard from './components/SpecialistCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import axios from '@/lib/axios';

export default function SpecialistsPage({ }) {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [specialists, setSpecialists] = useState([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);

  const pathname = usePathname();
  const router = useRouter();

  const { searchQuery, setSearchQuery } = useSearchSpecialist();

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/')
          } else {
            getSpecialists().then((specialists) => {
              console.log(specialists);
              setSpecialists(specialists);
            });
          }
        });
    }
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      const filtered = specialists.filter(specialist => specialist.branch === selectedBranch);
      setFilteredSpecialists(filtered);
    } else {
      setFilteredSpecialists(specialists);
    }
  }, [selectedBranch, specialists, filteredSpecialists]);

  // Context query
  useEffect(() => {
    const fetchSpecialists = async () => {
      let res = await axios.get('/api/specialists');
      let specialists = res.data.specialists;

      if(searchQuery != '' || searchQuery != null) {
        res = specialists.filter(specialist => specialist.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSpecialists(res);
      };
    }
    fetchSpecialists();
  }, [searchQuery]);

  return (
    <div className='block'>
      <div className='border-t'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-6'>
            <Sidebar
              specialists={specialists}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              className='hidden lg:block'
            />
            <div className='col-span-3 lg:col-span-5 lg:border-l'>
              <div className='px-4 py-6 lg:px-8 min-h-[83.9vh]'>
                <Tabs defaultValue='specialists' className='h-full space-y-6'>
                  <div className='flex justify-around '>
                    <TabsList className='flex justify-center'>
                      <TabsTrigger value='specialists' className='relative' aria-current={true}>
                        Listado de Profesionales
                      </TabsTrigger>
                      <TabsTrigger value='topten' className='relative lg:hidden sm:block text-primary'>
                        TopTen
                      </TabsTrigger>
                    </TabsList>
                    <div className='ml-auto mr-4 '>
                      <Input
                        className='w-full'
                        placeholder='Buscar personal...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <TabsContent value='specialists' className='border-none p-0 outline-none'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                          ¡Todos nuestros Profesionales!
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                          ¡Busca el que se adapte a tus necesidades aquí!
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {specialists.length} especialistas
                        </p>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {Array.isArray(filteredSpecialists) && filteredSpecialists.length > 0 ? (
                            filteredSpecialists.map((specialist) => (
                              <SpecialistCard
                                key={specialist.name}
                                specialist={specialist}
                                width={160}
                                height={160}
                              />
                            ))
                          ) : (
                            <p>No se encontraron especialistas</p>
                          )}
                        </div>
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  {/*Este aparece solo en sm */}
                  <TabsContent value='topten' className='border-none p-0 outline-none'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                          ¡Nuestros <span className='text-primary'>Profesionales</span> mas buscados!
                        </h2>
                        <Badge variant='destructive' className=''>OnFire!</Badge>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {Array.isArray(filteredSpecialists) && filteredSpecialists.length > 0 ? (
                            filteredSpecialists.map((specialist) => (
                              <SpecialistCard
                                key={specialist.name}
                                specialist={specialist}
                                width={160}
                                height={160}
                              />
                            ))
                          ) : (
                            <p>No se encontraron especialistas</p>
                          )}
                        </div>
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}