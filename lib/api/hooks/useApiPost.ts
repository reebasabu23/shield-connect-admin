import {
  type InvalidateQueryFilters,
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HTTP_STATUS, ROUTES } from "@/lib/constants";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/reducers/authSlice";
import type { CombinedErrorResponse } from "@/lib/types/api";

function useApiPost<TInput, TResponse>(
  mutationKey: QueryKey,
  callback: (input: TInput) => Promise<TResponse>,
  options?: UseMutationOptions<TResponse, CombinedErrorResponse, TInput>
) {
  const q = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation<TResponse, CombinedErrorResponse, TInput>({
    mutationKey,
    mutationFn: callback,
    ...options,
    // eslint-disable-next-line no-shadow-restricted-names
    onSuccess: (data, variables, undefined, context) => {
      for (let i = 1; i < mutationKey.length; i++) {
        q.invalidateQueries({ queryKey: [mutationKey[i]] } as InvalidateQueryFilters);
      }
      options?.onSuccess?.(data, variables,undefined, context);
    },
    onError: (error: CombinedErrorResponse, variables, undefined, context) => {
      switch (error.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          dispatch(logout());
          router.push(ROUTES.LOGIN + `?returnUrl=${window.location.pathname}`);
          break;
        default:
          break;
      }
      options?.onError?.(error, variables, undefined, context);
    },
  });
}

export default useApiPost;
