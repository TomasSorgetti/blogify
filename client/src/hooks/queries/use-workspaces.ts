import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllWorkbenches, 
  createWorkbench, 
  updateWorkbench, 
  deleteWorkbench 
} from "../../lib/services/workbench";
import { queryKeys } from "../../lib/react-query/query-keys";
import type { IWorkbench } from "../../types/workbench";
import toast from "react-hot-toast";

interface WorkbenchListResponse {
  data: IWorkbench[];
}

interface SingleWorkbenchResponse {
  data: IWorkbench;
}

export function useWorkbench(id: string) {
  return useQuery({
    queryKey: queryKeys.workbenches.detail(id),
    queryFn: async () => {
      const { data, error } = await getAllWorkbenches();
      if (error) throw new Error(error);
      const typedData = data as WorkbenchListResponse | null;
      const workbenches = typedData?.data ?? [];
      const workbench = workbenches.find(wb => wb._id === id);
      if (!workbench) throw new Error("Workspace not found");
      return workbench;
    },
    enabled: !!id,
  });
}

export function useWorkspaces() {
  return useQuery({
    queryKey: queryKeys.workbenches.list(),
    queryFn: async () => {
      const { data, error } = await getAllWorkbenches();
      if (error) throw new Error(error);
      const typedData = data as WorkbenchListResponse | null;
      return typedData?.data ?? [];
    },
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { name: string; description: string; colaborators: string[] }) => {
      const { data, error } = await createWorkbench(payload);
      if (error) throw new Error(error);
      const typedData = data as SingleWorkbenchResponse | null;
      if (!typedData?.data) throw new Error("Failed to create workspace");
      return typedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workbenches.all });
      toast.success("Workspace created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create workspace");
    },
  });
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, fields }: { id: string; fields: { name: string; description: string } }) => {
      const { data, error } = await updateWorkbench(id, fields);
      if (error) throw new Error(error);
      const typedData = data as SingleWorkbenchResponse | null;
      if (!typedData?.data) throw new Error("Failed to update workspace");
      return typedData.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workbenches.all });
      if (data._id) {
        queryClient.setQueryData(queryKeys.workbenches.detail(data._id), data);
      }
      toast.success("Workspace updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update workspace");
    },
  });
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await deleteWorkbench(id);
      if (error) throw new Error(error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workbenches.all });
      toast.success("Workspace deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete workspace");
    },
  });
}
