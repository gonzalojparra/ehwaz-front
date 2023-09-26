import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

export default function Hero() {
  return (
    <section className='bg-background'>
      <div className='relative pt-16 pb-32 flex content-center items-center justify-center'>
        <div className='absolute top-0 w-full h-full bg-top bg-cover'>
          <span id='blackOverlay' className='w-full h-full absolute opacity-75 bg-black'></span>
        </div>
        <div className='container relative mx-auto' data-aos='fade-in'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full lg:w-6/12 px-4 ml-auto mr-auto text-center'>
              <div>
                <h1 className='text-white font-bold text-5xl leading-none'>
                  Experiencia <span className='bg-clip-text text-transparent pb-2 bg-gradient-to-r from-primary to-[#008080]'>Ehwaz</span>
                </h1>
                <p className='mt-4 z-20 animate-fade-up text-center text-slate-400 animate-delay-100 sm:text-xl'>
                  Somos un portal de entrenamiento web para Personal Trainers
                  enfocado en <span className='font-semibold text-[#FFD700]'>ayudar</span> a los profesionales. Dales la mejor experiencia a tus alumnos con Ehwaz.
                </p>
                <Link href='/login'>
                  <Button className='mt-5' variant='default' size='lg'>Comenzá Ahora!</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden'>
          <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'
          >
            <polygon points='2560 0 2560 100 0 100'></polygon>
          </svg>
        </div>
      </div>

      <section id='about' className='relative py-20 '>
        <div className='container mx-auto px-4'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full md:w-4/12 ml-auto mr-auto px-4' data-aos='fade-right'>
              <Image
                alt='girl lifting'
                className='max-w-full rounded-lg shadow-2xl'
                width={600}
                height={400}
                src='/lift.jpg'
              />
            </div>
            <div className='w-full md:w-5/12 ml-auto mr-auto px-4' data-aos='fade-left'
            >
              <div className='md:pr-12'>
                <small className='text-primary font-medium'>Sobre nosotros</small>
                <h3 className='text-4xl uppercase font-bold'>Entrenamiento Seguro</h3>
                <p className='mt-4 text-lg leading-relaxed'>
                  Con nosotros podrás entrenar de forma segura y eficiente, con la ayuda de nuestros trainers
                  y la comunidad de Ehwaz alcanzarás tus objetivos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='pt-20 pb-20'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap justify-center text-center mb-24'>
            <div className='w-full lg:w-6/12 px-4'>
              <h2 className='text-4xl font-semibold uppercase'>
                Personal Trainers asociados
              </h2>
              <p className='text-lg leading-relaxed m-4'>
                Nuestro trainers están acá para dedicarle el tiempo y esfuerzo
                que necesites para alcanzar tu estado físico ideal.
              </p>
            </div>
          </div>

          <div className='flex flex-wrap'>

            <Card title='Pepe' />
            <Card title='Ruperta' />
            <Card title='El negro' />

          </div>
        </div>
      </section>

      <Separator />
      <section className="w-full py-12">
        <div className="container px-4 md:px-6" >
          <div className="grid gap-6 items-center" >
            <div className="flex flex-col justify-center space-y-8 text-center" >
              <div className="space-y-2" >
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] to-[#FFD700]"
                >
                  Somos Runas Software
                </h1>
                <p className="max-w-[600px] text-inherit md:text-xl mx-auto" >
                  Comprometidos a mantenernos a la vanguardia tecnológica para mejorar la eficiencia nuestros clientes.
                </p>
              </div>
              <div className="w-full max-w-full space-y-4 mx-auto" >
                <div className="grid grid-cols-3 gap-8" >
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                    <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                      <svg
                        className=" text-inherit h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                        <path
                          d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-inherit" >
                      Analíticas
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100" >
                      Detalles de los ejercicios realizados, con gráficos de progreso y estadísticas.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                    <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                      <svg
                        className=" text-inherit h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m8 6 4-4 4 4" />
                        <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                        <path d="m20 22-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-inherit" >
                      Seguimiento
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100" >
                      Permitimos a los clientes realizar un seguimiento de sus progresos.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                    <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                      <svg
                        className=" text-inherit h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-inherit" >
                      Seguridad
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100" >
                      Con seguridad confiable, sus datos siempre están seguros y protegidos.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                    <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                      <svg
                        className=" text-inherit h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-inherit" >
                      Condición Física
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100" >
                      Los ejercicios se adaptan a la condición física de cada cliente y mejorarán en base a sus objetivos.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                    <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                      <svg
                        className=" text-inherit h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-inherit" >
                      Guías Nutricionales
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100" >
                      Con los especialistas asociados, los clientes podrán mejorar su alimentación en base a sus ideales.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                    <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                      <svg
                        className=" text-inherit h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m8 6 4-4 4 4" />
                        <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                        <path d="m20 22-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-inherit" >
                      Contacto fácil
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100" >
                      La comunicación con los especialistas asociados permite a los clientes resolver sus problemas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}