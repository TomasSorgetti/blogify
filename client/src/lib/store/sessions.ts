import { create } from "zustand";
import { getMySessions } from "../services/sessions";
import type { ISession } from "../../types/session";

interface ISessionState {
  sessions: ISession[];
  loading: boolean;
  error: string | null;

  loadMySessions: () => Promise<void>;
}

export const useSessionStore = create<ISessionState>((set) => ({
  sessions: [],
  loading: false,
  error: null,

  async loadMySessions() {
    set((state: ISessionState) => ({ ...state, isLoading: true }));

    const { data, error } = await getMySessions();

    if (!error) {
      set((state: ISessionState) => ({
        ...state,
        sessions: data.data,
        isLoading: false,
      }));
    } else {
      set((state: ISessionState) => ({ ...state, isLoading: false }));
    }
  },
}));
