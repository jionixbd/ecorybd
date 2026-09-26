import type { MediaWIthRelations } from "@/features/media/types/media";

export interface ProductMediaWithRelations extends MediaWIthRelations {
  isFeatured: boolean;
  position: number;
  productMediaId: string;
}
