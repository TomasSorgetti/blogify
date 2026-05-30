import { privateApi } from "./api";
import { handleApiRequest } from "./apiHelpers";
import type { IUpdateProfileData, IChangePasswordData } from "../../types/user";

export function UpdateProfile(data: IUpdateProfileData) {
  if (data.image) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "preferences") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string | Blob);
        }
      }
    });

    return handleApiRequest(() =>
      privateApi.patch(`/users/me`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  }

  return handleApiRequest(() => privateApi.patch(`/users/me`, data));
}

export function ChangePassword(passwords: IChangePasswordData) {
  return handleApiRequest(() =>
    privateApi.patch(`/users/me/password`, passwords)
  );
}

export function searchUsers(query: string) {
  return handleApiRequest(() => privateApi.get(`/users/search?q=${query}`));
}
