import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import format from "date-fns/format";
import es from "date-fns/locale/es";
const options = {locale:es};

export function CustomCard({ plan }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del plan</CardTitle>
        <CardDescription>
          {plan.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium leading-none">Fecha inicio</p>
              <p className="text-sm text-muted-foreground">{format(new Date(plan.initial_date), 'd/M/Y', options)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium leading-none">Fecha fin</p>
              <p className="text-sm text-muted-foreground">{format(new Date(plan.final_date), 'd/M/Y', options)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}