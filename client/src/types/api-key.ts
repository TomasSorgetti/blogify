export interface IApiKey {
  _id: string;
  name: string;
  key: string;
  scopes: string[];
  isActive: boolean;
  expiresAt?: string;
  lastUsedAt?: string;
  createdAt: string;
}
