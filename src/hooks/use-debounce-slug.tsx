import { generateSlug } from "@/lib/generate-slug";
import { debounce } from "radash";
import { useEffect, useMemo } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

interface UseDebounceSlugOptions<
  TFieldValues extends FieldValues = FieldValues,
> {
  delay?: number;
  getValues: UseFormGetValues<TFieldValues>;
  name: string;
  setValue: UseFormSetValue<TFieldValues>;
}

export const useDebounceSlug = <
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  setValue,
  getValues,
  delay = 300,
}: UseDebounceSlugOptions<TFieldValues>) => {
  const debouncedSetSlug = useMemo(
    () =>
      debounce({ delay }, (value: string) => {
        const newSlug = generateSlug({ value });
        const slugPath = "slug" as Path<TFieldValues>;

        if (newSlug !== getValues(slugPath)) {
          setValue(
            slugPath,
            newSlug as PathValue<TFieldValues, Path<TFieldValues>>,
            {
              shouldValidate: true,
            }
          );
        }
      }),
    [delay, getValues, setValue]
  );

  useEffect(() => {
    debouncedSetSlug(name);
    return () => {
      debouncedSetSlug.cancel();
    };
  }, [name, debouncedSetSlug]);
};
