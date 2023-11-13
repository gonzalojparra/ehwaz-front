import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function CustomCard({ rutina }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del evento</CardTitle>
        <CardDescription>
          {rutina.routine.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium leading-none">Fecha</p>
              <p className="text-sm text-muted-foreground">{rutina.date}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium leading-none">Evento</p>
              <p className="text-sm text-muted-foreground">{rutina.routine.name}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}