import type { IAuthor } from "./article";

export interface IWorkbench {
  _id?: string;
  name: string;
  description: string;
  owner?: string | IAuthor;
  members?: IWorkbenchMember[];
  settings?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
  colaborators: IWorkbenchMember[];
  articlesCount?: number;
}

export interface IWorkbenchMember {
  userId:
    | {
        _id: string;
        username: string;
        email: string;
        avatar: string;
        isOnline?: boolean;
      }
    | string;
  role: string;
  _id: string;
}

export interface IActivityLog {
  _id: string;
  userId: {
    _id: string;
    username: string;
    avatar: string;
  };
  workbenchId: string;
  action: string;
  details: {
    articleTitle?: string;
    from?: string;
    to?: string;
    detail?: string;
  };
  createdAt: string;
}
