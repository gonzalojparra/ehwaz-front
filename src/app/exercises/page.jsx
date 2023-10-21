"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ModalImage } from "./components/ModalImage";
import SimpleSpiner from "@/components/ui/simple-spiner";
import './swiper.css';

// import required modules
import { Navigation } from 'swiper/modules';
import InputError from "@/components/ui/InputError";

export default function Page() {
  const [busqueda, setBusqueda] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);

  const obtenerEjercicio = async () => {
    if (busqueda != null && busqueda != "") {
        setLoading(true);
        setSuggestions(null);
      await axios
        .get(
          "https://wger.de/api/v2/exercise/search/?language=spanish&term=" +
            busqueda
        )
        .then((res) => {
          setSuggestions(res.data.suggestions);
          console.log(res.data.suggestions);
        });
        setLoading(false)
      //https://wger.de/api/v2/exercise/search/?language=spanish&term=biceps
    }
  };

  return (
    <div className="bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]">
      <div className="flex flex-row md:w-[800px] sm:w-full pb-8">
        <Input
          className="rounded-md border border-input bg-background px-3 py-2 text-sm mx-4"
          type="input"
          placeholder="Ingrese un ejercicio para buscar"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            obtenerEjercicio();
          }}
        >
          Buscar {loading && <SimpleSpiner/>}
        </Button>
      </div>
      
      {suggestions == null ? <></>:
        <>
            {suggestions.length > 0 ? 
            <div className="md:w-[500px] sm:w-[80%] pb-8 w-[80%]">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {suggestions.map((sug)=>{
                return (
                    <SwiperSlide>
                        <Card className="w-full px-4">
                            <CardHeader>
                                <CardTitle>{sug.value}</CardTitle>
                                <CardDescription>{sug.value}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Nombre: {sug.data.name}</p>
                                <p>Parte del cuerpo: {sug.data.category}</p>
                                {sug.data.image != null ? <ModalImage sug={sug}/> : <></>}
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                )
            })}
            </Swiper> 

            </div> :
            <div className="md:w-[500px] sm:w-full pb-8">
                <InputError messages={"No hemos encontrado ejercicios con dicha búsqueda"}/>
            </div>
        }
        </>
        }
        
    </div>
  );
}
