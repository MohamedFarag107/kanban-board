import axios from "axios";
import { ApiError } from "../types/api-error";

export const errorHandler = (error: any) => {
  console.error(`Api error: ${JSON.stringify(error.response?.data, null, 2)}`);

  if (axios.isAxiosError(error)) {
    const axiosError = error.response?.data as ApiError;
    const messages = Array.isArray(axiosError.message)
      ? axiosError.message
      : [axiosError.message];
    if (messages.length > 0) {
      return messages[0];
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An error occurred";
};
