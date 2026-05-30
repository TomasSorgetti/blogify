import { create } from "zustand";
import {
  getAllWorkbenches,
  createWorkbench,
  updateWorkbench,
  deleteWorkbench,
  addMember,
  removeMember,
  updateMemberRole,
} from "../services/workbench";
import type { IWorkbench } from "../../types/workbench";

type ActionResult = { success: boolean; message?: string };

export interface IWorkbenchState {
  workbenches: IWorkbench[];
  loading: boolean;
  error: string | null;

  loadWorkbenches: () => Promise<void>;
  createWorkbench: (workbench: Pick<IWorkbench, "name" | "description" | "colaborators">) => Promise<ActionResult>;
  updateWorkbench: (workbenchId: string, fields: Pick<IWorkbench, "name" | "description">) => Promise<ActionResult>;
  deleteWorkbench: (workbenchId: string) => Promise<ActionResult>;
  addMember: (workbenchId: string, userId: string, role: string) => Promise<ActionResult>;
  removeMember: (workbenchId: string, userId: string) => Promise<ActionResult>;
  updateMemberRole: (workbenchId: string, userId: string, role: string) => Promise<ActionResult>;
}

export const useWorkbenchStore = create<IWorkbenchState>((set) => ({
  workbenches: [],
  loading: false,
  error: null,

  loadWorkbenches: async () => {
    set({ loading: true, error: null });

    const { data, error } = await getAllWorkbenches();

    if (error) {
      set({ loading: false, error });
      return;
    }

    set({ workbenches: data.data, loading: false });
  },

  createWorkbench: async ({ name, description, colaborators }) => {
    set({ loading: true, error: null });

    const mappedColaborators = colaborators?.map((c) =>
      typeof c.userId === "string" ? c.userId : c.userId._id
    ) || [];

    const { data, error } = await createWorkbench({ name, description, colaborators: mappedColaborators });

    if (error) {
      set({ loading: false, error });
      return { success: false, message: error };
    }

    set((state) => ({
      workbenches: [...state.workbenches, data.data],
      loading: false,
    }));

    return { success: true };
  },

  updateWorkbench: async (workbenchId, { name, description }) => {
    set({ loading: true, error: null });

    const { data, error } = await updateWorkbench(workbenchId, { name, description });

    if (error) {
      set({ loading: false, error });
      return { success: false, message: error };
    }

    set((state) => ({
      workbenches: state.workbenches.map((wb) =>
        wb._id === workbenchId ? { ...wb, ...data.data } : wb,
      ),
      loading: false,
    }));

    return { success: true };
  },

  deleteWorkbench: async (workbenchId) => {
    set({ loading: true, error: null });

    const { error } = await deleteWorkbench(workbenchId);

    if (error) {
      set({ loading: false, error });
      return { success: false, message: error };
    }

    set((state) => ({
      workbenches: state.workbenches.filter((wb) => wb._id !== workbenchId),
      loading: false,
    }));

    return { success: true };
  },

  addMember: async (workbenchId, userId, role) => {
    set({ loading: true, error: null });
    const { data, error } = await addMember(workbenchId, userId, role);

    if (error) {
      set({ loading: false, error });
      return { success: false, message: error };
    }

    set((state) => ({
      workbenches: state.workbenches.map((wb) =>
        wb._id === workbenchId ? { ...wb, members: data.data.members } : wb,
      ),
      loading: false,
    }));
    return { success: true };
  },

  removeMember: async (workbenchId, userId) => {
    set({ loading: true, error: null });
    const { data, error } = await removeMember(workbenchId, userId);

    if (error) {
      set({ loading: false, error });
      return { success: false, message: error };
    }

    set((state) => ({
      workbenches: state.workbenches.map((wb) =>
        wb._id === workbenchId ? { ...wb, members: data.data.members } : wb,
      ),
      loading: false,
    }));
    return { success: true };
  },

  updateMemberRole: async (workbenchId, userId, role) => {
    set({ loading: true, error: null });
    const { data, error } = await updateMemberRole(workbenchId, userId, role);

    if (error) {
      set({ loading: false, error });
      return { success: false, message: error };
    }

    set((state) => ({
      workbenches: state.workbenches.map((wb) =>
        wb._id === workbenchId ? { ...wb, members: data.data.members } : wb,
      ),
      loading: false,
    }));
    return { success: true };
  },
}));
