"use client";
import { useEffect } from "react";
import Chart from "./components/Chart";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import axios from "@/lib/axios";

export default function Metricas() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname != "/login" && pathname != "/registro") {
      axios.post("/api/permissions", { url: pathname }).then((res) => {
        if (res.data.data == false) {
          router.push("/");
        }
      });
    }
  }, []);

  return (
    <div className="bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]">
      <div className="md:w-[1200px] sm:w-full pb-8">
        <Chart />
      </div>
    </div>
  );
}
