import { useCallback, useState } from "react";
import { tryCatch as tryCatchUtil } from "@core/utils/try-catch";

type TApiError = {
  message: string;
  status?: number;
};

type SuccessResult<T> = readonly [T, null];
type ErrorResult<E> = readonly [null, E];
type Result<T, E> = SuccessResult<T> | ErrorResult<E>;

export function useTryCatch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tryCatch = useCallback(async <T>(promise: Promise<T>): Promise<Result<T | null, TApiError | null>> => {
    setIsLoading(true);
    try {
      const result = await tryCatchUtil(promise);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { tryCatch, isLoading };
}
