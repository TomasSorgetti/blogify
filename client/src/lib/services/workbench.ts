import { privateApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

type WorkbenchCreatePayload = {
  name: string;
  description: string;
  colaborators: string[];
};

type WorkbenchUpdatePayload = {
  name: string;
  description: string;
};

export function getAllWorkbenches() {
  return handleApiRequest(() => privateApi.get(`/workbenches`));
}

export function createWorkbench({ name, description, colaborators }: WorkbenchCreatePayload) {
  return handleApiRequest(() =>
    privateApi.post(`/workbenches`, { name, description, colaborators })
  );
}

export function updateWorkbench(workbenchId: string, fields: WorkbenchUpdatePayload) {
  return handleApiRequest(() =>
    privateApi.patch(`/workbenches/${workbenchId}`, fields)
  );
}

export function deleteWorkbench(workbenchId: string) {
  return handleApiRequest(() =>
    privateApi.delete(`/workbenches/${workbenchId}`)
  );
}

export function addMember(workbenchId: string, userId: string, role: string) {
  return handleApiRequest(() =>
    privateApi.post(`/workbenches/${workbenchId}/members`, { userId, role })
  );
}

export function removeMember(workbenchId: string, targetUserId: string) {
  return handleApiRequest(() =>
    privateApi.delete(`/workbenches/${workbenchId}/members/${targetUserId}`)
  );
}

export function updateMemberRole(workbenchId: string, targetUserId: string, role: string) {
  return handleApiRequest(() =>
    privateApi.patch(`/workbenches/${workbenchId}/members/${targetUserId}/role`, { role })
  );
}

export function getWorkbenchActivity(workbenchId: string) {
  return handleApiRequest(() =>
    privateApi.get(`/workbenches/${workbenchId}/activity`)
  );
}
