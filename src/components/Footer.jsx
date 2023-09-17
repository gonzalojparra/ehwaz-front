import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <>
      <Separator />
      <footer className='fixed bottom-0 w-full bg-opacity-70 backdrop-blur-lg'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row'>
          <p className='text-center text-sm leading-loose text-inherit md:text-left'>
            © 2023 <a className='font-medium underline underline-offset-4' href='https://github.com/gonzalojparra/ehwaz-front' target='_blank'>Runas Software</a>. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  )
}