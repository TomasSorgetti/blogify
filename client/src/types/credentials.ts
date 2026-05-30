export type ICredentials = {
  username?: string;
  email: string;
  password: string;
  rememberme?: boolean;
};

export type IRegisterProps = {
  username: string;
  email: string;
  password: string;
  workspace: string;
  preferences: {
    role: string;
  };
};
