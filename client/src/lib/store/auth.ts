import { create } from "zustand";
import {
  GoogleSignInUser,
  SignInUser,
  SignOutUser,
  SignUpUser,
} from "../services/auth";
import type { IUser } from "../../types/user";
import type { ICredentials, IRegisterProps } from "../../types/credentials";

export type AuthResponse<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export interface IAuthState {
  user: IUser | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  isInitializing: boolean;
  error: string | null;

  setUser: (user: IUser) => void;
  resetUser: () => void;
  checkAuth: () => Promise<void>;
  login: (credentials: ICredentials) => Promise<AuthResponse<{ user: IUser }>>;
  register: (
    credentials: IRegisterProps,
  ) => Promise<
    AuthResponse<{ email: string; tokenExpiresIn: string; username: string }>
  >;
  logout: () => Promise<AuthResponse>;
  googleLogin: (credentials: {
    idToken: string;
    rememberme: boolean;
  }) => Promise<AuthResponse<{ user: IUser }>>;
}

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  isAdmin: false,
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  loading: false,
  isInitializing: !!localStorage.getItem("isAuthenticated"),
  error: null,

  setUser: (user: IUser) => set({ user }),

  resetUser: () => {
    localStorage.removeItem("isAuthenticated");
    set({
      user: null,
      isAdmin: false,
      isAuthenticated: false,
      isInitializing: false,
    });
  },

  checkAuth: async () => {
    const { isAuthenticated, user, setUser, logout } = useAuthStore.getState();

    if (!isAuthenticated || user) {
      set({ isInitializing: false });
      return;
    }

    try {
      const { getProfile } = await import("../services/auth");
      const { data, error } = await getProfile();

      if (error || !data?.success) {
        // If we are authenticated but profile fails (e.g. token expired and refresh failed)
        await logout();
      } else {
        setUser(data.data);
      }
    } catch {
      await logout();
    } finally {
      set({ isInitializing: false });
    }
  },

  login: async (credentials: ICredentials) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await SignInUser(credentials);

      console.log({ data, error });

      if (error) {
        set({
          user: null,
          error,
          isAdmin: false,
          isAuthenticated: false,
          loading: false,
        });
        return { success: false, error };
      }

      if (!data?.success) {
        const msg = data?.message || "Login failed";
        set({
          user: null,
          isAdmin: false,
          error: msg,
          isAuthenticated: false,
          loading: false,
        });
        return { success: false, error: msg };
      }

      localStorage.setItem("isAuthenticated", "true");

      set({
        user: data.data.user,
        isAdmin: data.data.user.role === "admin",
        isAuthenticated: true,
        error: null,
        loading: false,
      });

      return { success: true, data: data.data };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      set({
        user: null,
        error: msg,
        isAuthenticated: false,
        loading: false,
      });
      return { success: false, error: msg };
    }
  },

  register: async ({
    username,
    email,
    password,
    workspace,
    preferences,
  }: IRegisterProps) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await SignUpUser({
        username,
        email,
        password,
        workspace,
        preferences,
      });

      if (error) {
        throw new Error(error);
      }

      if (!data?.success) {
        throw new Error(data?.message);
      }

      set({
        loading: false,
        error: null,
      });

      return { success: true, data: data?.data };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      set({
        error: msg,
        loading: false,
      });
      return { success: false, error: msg };
    }
  },

  logout: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return { success: true };

    set({ loading: true, error: null });
    try {
      const { data, error } = await SignOutUser();

      // We clear local state regardless of server success.
      // If the server fails, it's likely because the session is already dead.
      localStorage.removeItem("isAuthenticated");
      set({
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: false,
        error: null,
      });

      if (error || !data?.success) {
        console.log("Logout API warning:", error || data?.message);
        return { success: false, error: error || data?.message };
      }

      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Even on network error, we want to clear the local session.
      localStorage.removeItem("isAuthenticated");
      set({
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
      return { success: false, error: msg };
    }
  },

  // todo => if user add google account method to login, and add google avatar (if doesnt allready have one), must update global state
  googleLogin: async ({ idToken, rememberme }) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await GoogleSignInUser({ idToken, rememberme });

      console.log("Data: ", data);
      console.log("Error: ", error);

      if (error) {
        set({
          user: null,
          error,
          isAdmin: false,
          isAuthenticated: false,
          loading: false,
        });
        return { success: false, error };
      }

      if (!data?.success) {
        const msg = data?.message || "Login failed";
        set({
          user: null,
          isAdmin: false,
          error: msg,
          isAuthenticated: false,
          loading: false,
        });
        return { success: false, error: msg };
      }

      localStorage.setItem("isAuthenticated", "true");

      set({
        user: data.data.user,
        isAdmin: data.data.user.role === "admin",
        isAuthenticated: true,
        error: null,
        loading: false,
      });

      return { success: true, data: data.data };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      set({
        user: null,
        error: msg,
        isAuthenticated: false,
        loading: false,
      });
      return { success: false, error: msg };
    }
  },
}));
