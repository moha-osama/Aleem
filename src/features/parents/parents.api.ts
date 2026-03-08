import { z } from "zod";
import { apiClient } from "@/api/client";
import {
  linkParentChildResponseSchema,
  parentChildrenSchema,
} from "./parents.schemas";
import type {
  LinkParentChildRequest,
  LinkParentChildResponse,
  ParentChild,
  RequestOptions,
} from "./parents.types";

const ENABLE_API_RESPONSE_VALIDATION =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_API_VALIDATION === "true";

function parseWithSchema<T>(schema: z.ZodType<T>, data: unknown): T {
  if (!ENABLE_API_RESPONSE_VALIDATION) {
    return data as T;
  }

  return schema.parse(data);
}

export async function getParentChildren(
  options?: RequestOptions,
): Promise<ParentChild[]> {
  const response = await apiClient.get("/api/parents/children/", {
    signal: options?.signal,
  });

  return parseWithSchema(parentChildrenSchema, response.data);
}

export async function linkParentChild(
  payload: LinkParentChildRequest,
  options?: RequestOptions,
): Promise<LinkParentChildResponse> {
  const response = await apiClient.post("/api/parents/children/add/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(linkParentChildResponseSchema, response.data);
}
