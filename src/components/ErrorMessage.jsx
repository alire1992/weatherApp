import { FaExclamationTriangle } from "react-icons/fa";
import Button from "./Button";

function ErrorMessage({
  message = "Failed to fetch data. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-8 bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl shadow-lg max-w-md mx-auto">
      <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-red-700 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-600 text-center mb-4">{message}</p>

      {onRetry && (
        <Button type="error" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;
