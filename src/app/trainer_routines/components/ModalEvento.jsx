'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/ui/InputError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SimpleSpiner from "@/components/ui/simple-spiner";
import axios from "@/lib/axios";

export default function ModalEvento({open, setOpen}){
    

    return(
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Evento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          asd asd asd
        </div>
        <DialogFooter>
          <Button type="button" >Crear Rutina</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}