import type { IPlan } from "./plan";

export type ISubscription = {
  _id: string;
  userId: string;
  planId: IPlan;
  status: string;
  paymentProvider: string;
  createdAt: string;
  startDate: string;
  updatedAt: string;
  __v: number;
};
