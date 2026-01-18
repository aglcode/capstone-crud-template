import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const AlertDemo = () => {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
    <Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    This project is under development.
  </AlertDescription>
</Alert>
  </div>
  )
}

export default AlertDemo