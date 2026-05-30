import type { AxiosResponse, AxiosError } from "axios";
import type {
  IApiResponse,
  IValidationError,
  IApiError,
} from "../../types/api";

export async function handleApiRequest<T>(
  requestFn: () => Promise<AxiosResponse<T>>,
): Promise<IApiResponse<T | null>> {
  let data: T | null = null;
  let error: string | null = null;
  let details: IValidationError[] | undefined = undefined;

  try {
    const res = await requestFn();
    data = res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError<{ error: IApiError }>;
    const errorResponse = axiosError?.response?.data?.error;

    error =
      errorResponse?.message || axiosError.message || "Something went wrong";
    details = errorResponse?.details;

    console.error("[API Error Details]:", {
      status: axiosError?.response?.status,
      message: error,
      details,
    });
  }

  return { data, error, details };
}
