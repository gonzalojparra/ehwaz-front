import { Badge } from "@/components/ui/badge"
import { Card } from "@tremor/react"
import {
  CardTitle,
  CardHeader,
  CardContent
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import format from "date-fns/format";
import es from "date-fns/locale/es";

const options = { locale: es };

export function CustomCard({ plan }) {
  return (
    <Card className='w-full'>
      <CardHeader className="p-0 flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
          <div className={`bg-[${plan.color}] px-2 py-1 rounded-full text-xs font-medium`}>{plan.color}</div>
        </div>
        <div>
          <p className="mt-2 text-md">{plan.student.name} {plan.student.last_name}</p>
          <div className="w-20 h-20">
            <img
              alt="Student Avatar"
              className="rounded-full mt-2"
              height="80"
              src={plan.student.profile_picture_url}
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width="80"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between space-x-4 pb-[0.5rem] pt-2">
          <Badge variant="solid" className="text-sm bg-green-200 text-green-800 px-2 py-1 w-1/2 justify-center items-center flex">
            <IconCalendar className="mr-1 h-4 w-4 text-green-600" />
            Comienzo: {format(new Date(plan.initial_date), 'd/M/Y', options)}
          </Badge>
          <Badge variant="solid" className="text-sm bg-red-200 text-red-800 px-2 py-1 w-1/2 justify-center items-center flex">
            <IconCalendar className="mr-1 h-4 w-4 text-red-600" />
            Final: {format(new Date(plan.final_date), 'd/M/Y', options)}
          </Badge>
        </div>
        <div className="grid w-full gap-1.5 pt-5">
          <Label htmlFor="student_feedback">Feedback</Label>
          <Textarea id="feedback" value={plan.student_feedback || 'No hay feedback'} disabled />
          <p className="text-sm text-gray-500 dark:text-gray-400">Si el alumno ha ingresado un feedback, se mostrará.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function IconCalendar(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}