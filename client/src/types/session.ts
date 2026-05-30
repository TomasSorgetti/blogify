export interface ISession {
  userId: string;
  refreshToken: string;
  userAgent: string;
  ip: string;
  expiresAt: number;
  isValid: boolean;
}
