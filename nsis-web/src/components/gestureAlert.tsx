import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function GestureAlert() {
  return (
    <div className="p-5">
        <Alert >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Alert</AlertTitle>
      <AlertDescription>
        Kindly click the capture button and make a thumbs up gesture.
      </AlertDescription>
    </Alert>
    </div>
  )
}
