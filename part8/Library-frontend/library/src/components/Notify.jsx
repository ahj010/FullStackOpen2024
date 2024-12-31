import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div className="flex justify-center mt-4">
      <Alert variant="destructive" className="max-w-md">
        <XCircle className="h-6 w-6 text-red-500" />
        <div>
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default Notify;
