'use client'
import Chart from './components/Chart';


export default function Metricas(){

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[1200px] sm:w-full pb-8'>
                <Chart/>
            </div>
        </div>
    )
}