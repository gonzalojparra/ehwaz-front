import { Button } from '@/components/ui/button';
import { Card } from './ui/card';
import Image from 'next/image';

export default function Hero() {
  return (
    <section>
      <div className='relative pt-16 pb-32 flex content-center items-center justify-center'>
        <div className='absolute top-0 w-full h-full bg-top bg-cover'>
          <span id='blackOverlay' className='w-full h-full absolute opacity-75 bg-black'></span>
        </div>
        <div className='container relative mx-auto' data-aos='fade-in'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full lg:w-6/12 px-4 ml-auto mr-auto text-center'>
              <div>
                <h1 className='text-white font-bold text-5xl leading-none'>
                  Experiencia <span className='bg-clip-text text-transparent pb-2 bg-gradient-to-r from-[#3b863b] to-[#12ffc4]'>Ehwaz</span>
                </h1>
                <p className='mt-4 z-20 animate-fade-up text-center text-slate-400 animate-delay-100 sm:text-xl'>
                  Somos un portal de entrenamiento web para Personal Trainers
                  enfocado en <span className='font-semibold text-primary'>ayudar</span> a los profesionales. Dales la mejor experiencia a tus alumnos con Ehwaz.
                </p>
                <Button className='mt-5' variant='outline' size='lg'>Descargar Ehwaz</Button>
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
    </section>
  )
}