import { apiClient } from "@/api/client";
import { parseWithSchema } from "@/api/parseWithSchema";
import type { RequestOptions } from "@/api/types";
import {
  assignSchoolResponseSchema,
  linkParentChildResponseSchema,
  parentChildrenSchema,
  schoolsSchema,
  updateChildProfileResponseSchema,
} from "./parents.schemas";
import type {
  AssignSchoolMutationVars,
  AssignSchoolResponse,
  LinkParentChildRequest,
  LinkParentChildResponse,
  ParentChild,
  School,
  UpdateChildProfileRequest,
  UpdateChildProfileResponse,
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

export async function getSchools(options?: RequestOptions): Promise<School[]> {
  const response = await apiClient.get("/api/schools/", {
    signal: options?.signal,
  });
  return parseWithSchema(schoolsSchema, response.data);
}

export async function assignSchoolToChild(
  { childId, school_id }: Omit<AssignSchoolMutationVars, never>,
  options?: RequestOptions,
): Promise<AssignSchoolResponse> {
  const response = await apiClient.post(
    `/api/parents/children/${childId}/assign-school/`,
    { school_id },
    { signal: options?.signal },
  );
  return parseWithSchema(assignSchoolResponseSchema, response.data);
}

export async function updateChildProfile(
  childId: number,
  payload: UpdateChildProfileRequest,
  options?: RequestOptions,
): Promise<UpdateChildProfileResponse> {
  const response = await apiClient.patch(
    `/api/parents/children/${childId}/`,
    payload,
    { signal: options?.signal },
  );
  return parseWithSchema(updateChildProfileResponseSchema, response.data);
}
