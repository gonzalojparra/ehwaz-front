/* const InputError = ({ messages = [], className = '', ...props }: Props) => (
  <>
    {messages?.length > 0 && (
      <>
        {messages.map((message, index) => (
          <p
            {...props}
            className={`text-sm text-red-600 ${className}`}
            key={index}>
            {message}
          </p>
        ))}
      </>
    )}
  </>
) */

import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const InputError = ({ messages = [], className = '', ...props }) => (
  <>
    {messages?.length > 0 && (
      <>
        <Alert variant="destructive">
          <AlertCircle className="h-2 w-2" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription
            {...props}
          >
            {messages}
          </AlertDescription>
        </Alert>
      </>
    )}
  </>
)

export default InputError;