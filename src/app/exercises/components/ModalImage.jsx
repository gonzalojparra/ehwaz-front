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
import Image from "next/image";

export function ModalImage({ sug }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Imagen</Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>{sug.value}</DialogTitle>
        </DialogHeader>
        <div className="">
          <Image
            src={"https://wger.de" + sug.data.image}
            width={350}
            height={350}
            alt={sug.data.name}
          ></Image>
        </div>
      </DialogContent>
    </Dialog>
  );
}
