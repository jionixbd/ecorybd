import { defineRelations } from "drizzle-orm";

// biome-ignore lint/performance/noNamespaceImport: This is intended
import * as schema from "./schema";

export const relations = defineRelations(schema, () => ({}));