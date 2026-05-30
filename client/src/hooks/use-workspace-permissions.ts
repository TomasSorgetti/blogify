import { useMemo } from "react";
import { useAuthStore } from "../lib/store/auth";
import type { IWorkbench, IWorkbenchMember } from "../types/workbench";

export function useWorkspacePermissions(
  workbench: IWorkbench | null | undefined,
) {
  const { user } = useAuthStore();

  const isOwner = useMemo(() => {
    if (!workbench || !user) return false;
    const ownerId =
      typeof workbench.owner === "string"
        ? workbench.owner
        : workbench.owner?._id;
    return ownerId === user._id;
  }, [workbench, user]);

  const member = useMemo(() => {
    if (!workbench || !user) return null;
    return workbench.members?.find((m: IWorkbenchMember) => {
      const memberUserId =
        typeof m.userId === "string" ? m.userId : m.userId?._id;
      return memberUserId === user._id;
    });
  }, [workbench, user]);

  const isMember = useMemo(() => !!member, [member]);

  const canEdit = useMemo(() => {
    if (isOwner) return true;
    if (!member) return false;
    return member.role === "editor" || member.role === "owner";
  }, [isOwner, member]);

  const role = useMemo(() => {
    if (isOwner) return "owner";
    return member?.role || null;
  }, [isOwner, member]);

  return {
    isOwner,
    isMember,
    canEdit,
    role,
    user,
  };
}
