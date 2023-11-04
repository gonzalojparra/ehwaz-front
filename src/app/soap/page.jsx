'use client'

import axios from "axios"
import { parseString } from "xml2js";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const serviceUrl = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';

export default function Page() {
    const [codigo, setCodigo] = useState('');
    const [rta, setRta] = useState(null);

    const consulta = async() => {
        let soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
      <soapenv:Header/>
      <soapenv:Body>
        <web:CountryIntPhoneCode>
          <web:sCountryISOCode>${rta}</web:sCountryISOCode>
        </web:CountryIntPhoneCode>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
       await axios.post(serviceUrl, soapRequest, {
            headers: {
                'Content-Type': 'text/xml',
                'Access-Control-Allow-Origin':'no-cors'
            },
        })
            .then((response) => {
                return new Promise((resolve, reject) => {
                    parseString(response.data, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            /* resolve(result); */
                            setRta(result);
                        }
                    });
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    /* useEffect(() => {
        consulta();
    }, []) */

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[1200px] sm:w-full pb-8'>
                <Label >Ingrese el número de codigo a buscar:</Label>
                <Input
                    value={codigo}
                    onChange={(e) => { setCodigo(e.target.value) }}
                    type={"text"} />
                <Button onClick={()=>consulta()}>Buscar</Button>
                {rta &&
                    <div>
                        <h2>Country Information</h2>
                        <p>Country: {rta['soap:Envelope']['soap:Body'][0].CountryIntPhoneCodeResponse[0].CountryIntPhoneCodeResult[0].sName[0]}</p>
                        <p>Phone Code: {rta['soap:Envelope']['soap:Body'][0].CountryIntPhoneCodeResponse[0].CountryIntPhoneCodeResult[0].sPhoneCode[0]}</p>
                    </div>
                }
            </div>
        </div>
    )

}