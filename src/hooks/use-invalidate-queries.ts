"use client";

import {
  useQueryClient,
  type InvalidateQueryFilters,
  type QueryKey,
} from "@tanstack/react-query";
import { useCallback } from "react";

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidate = useCallback(
    async (
      queryKeys: QueryKey[],
      filters?: Omit<InvalidateQueryFilters, "queryKey">
    ) => {
      await Promise.all(
        queryKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey, ...filters })
        )
      );
    },
    [queryClient]
  );

  return invalidate;
};
