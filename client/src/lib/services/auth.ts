import type { ICredentials, IRegisterProps } from "../../types/credentials";
import { privateApi, publicApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

export function SignInUser({ email, password, rememberme }: ICredentials) {
  return handleApiRequest(() =>
    publicApi.post(`/auth/login`, { email, password, rememberme }),
  );
}

export function SignUpUser({
  username,
  email,
  password,
  workspace,
  preferences,
}: IRegisterProps) {
  return handleApiRequest(() =>
    publicApi.post(`/auth/register`, {
      username,
      email,
      password,
      workspace,
      preferences,
    }),
  );
}

export function VerifyEmail(token: string) {
  return handleApiRequest(() => publicApi.post(`/auth/verify?token=${token}`));
}

export function ResendVerification() {
  throw new Error("Not implemented");
}

export function SignOutUser() {
  return handleApiRequest(() => privateApi.post(`/auth/logout`));
}

export function getProfile() {
  return handleApiRequest(() => privateApi.get(`/users/me`));
}

export function GoogleSignInUser({
  idToken,
  rememberme,
}: {
  idToken: string;
  rememberme?: boolean;
}) {
  return handleApiRequest(() =>
    privateApi.post(`/auth/google`, { idToken, rememberme }),
  );
}
