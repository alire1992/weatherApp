import ErrorMessage from "./ErrorMessage";

function ErrorFallback({ error, resetErrorBoundary }) {
  return <ErrorMessage message={error.message} onRetry={resetErrorBoundary} />;
}
export default ErrorFallback;
