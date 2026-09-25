import type { MediaWIthRelations } from "@/features/media/types/media";
import type React from "react";
import { createContext, useContext, useMemo } from "react";

export interface MediaPickerContextValue {
  deletable?: boolean;
  onSelect?: (media: MediaWIthRelations) => void;
  selectable: boolean;
  selectedId?: string | null;
}

interface MediaPickerProviderProps extends MediaPickerContextValue {
  children: React.ReactNode;
}

const DEFAULT_CONTEXT_VALUE: MediaPickerContextValue = {
  deletable: false,
  selectable: false,
  selectedId: null,
};

const MediaPickerContext = createContext<MediaPickerContextValue>(
  DEFAULT_CONTEXT_VALUE
);

export function MediaPickerProvider({
  selectable,
  selectedId,
  onSelect,
  deletable,
  children,
}: MediaPickerProviderProps) {
  const value = useMemo(
    () => ({ deletable, onSelect, selectable, selectedId }),
    [selectable, onSelect, deletable, selectedId]
  );

  return (
    <MediaPickerContext.Provider value={value}>
      {children}
    </MediaPickerContext.Provider>
  );
}

export function useMediaPicker() {
  const ctx = useContext(MediaPickerContext);

  return ctx;
}

MediaPickerContext.displayName = "MediaPickerContext";
