interface ApiErrorProps {
  error: Error;
}
export const ApiError: React.FC<ApiErrorProps> = ({ error }) => {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>{error.message}</p>
    </div>
  );
};
