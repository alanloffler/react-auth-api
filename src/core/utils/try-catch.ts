import axios from "axios";

type TApiError = {
  message: string;
  status?: number;
};
type SuccessResult<T> = readonly [T, null];
type ErrorResult<E> = readonly [null, E];
type Result<T, E> = SuccessResult<T> | ErrorResult<E>;

export async function tryCatch<T>(promise: Promise<T>): Promise<Result<T | null, TApiError | null>> {
  try {
    const data = await promise;

    return [data, null] as const;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const rawMessage = error.response?.data?.message;
      const arrayValidation = Array.isArray(rawMessage) && rawMessage.length > 0;
      const stringValidation = typeof rawMessage === "string" && rawMessage.trim() !== "";
      let message = "Error desconocido en el servidor";

      if (arrayValidation) {
        message = rawMessage[0];
      } else if (stringValidation) {
        message = rawMessage;
      }

      return [
        null,
        {
          message,
          status: error.response?.status,
        },
      ];
    }

    return [null, { message: "Error desconocido en el servidor" }];
  }
}
