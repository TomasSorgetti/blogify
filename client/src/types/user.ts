import type { ISubscription } from "./subscription";

export type NotificationPreferences = {
  articles: boolean;
  comments: boolean;
  api_alerts: boolean;
  billing: boolean;
  newsletter: boolean;
};

export type Preferences = {
  theme: "light" | "dark";
  notifications: NotificationPreferences;
};

export type UserRole = "user" | "admin";

export type IUser = {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  isVerified: boolean;
  lastLogin: string;
  isActive: boolean;
  deletedAt?: string;
  twoFactorEnabled?: boolean;
  preferences: Preferences;
  subscription?: ISubscription;
  sessions?: string[];
  workbenches?: string[];
  createdAt: string;
  updatedAt: string;
};

export interface IUpdateProfileData {
  username?: string;
  bio?: string;
  preferences?: Partial<Preferences>;
  image?: File | Blob;
}

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
