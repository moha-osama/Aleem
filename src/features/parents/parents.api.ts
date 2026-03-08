import { apiClient } from "@/api/client";
import { parseWithSchema } from "@/api/parseWithSchema";
import type { RequestOptions } from "@/api/types";
import {
  linkParentChildResponseSchema,
  parentChildrenSchema,
} from "./parents.schemas";
import type {
  LinkParentChildRequest,
  LinkParentChildResponse,
  ParentChild,
} from "./parents.types";

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
