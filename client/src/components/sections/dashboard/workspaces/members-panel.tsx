import { useState, useEffect, useCallback, useRef } from "react";
import { UserPlus, X, Search } from "lucide-react";
import { useWorkbenchStore } from "../../../../lib/store/workbench";
import { usePlanLimits } from "../../../../hooks/use-plan-limits";
import { searchUsers } from "../../../../lib/services/user";
import type { IWorkbench } from "../../../../types/workbench";
import type { IUser } from "../../../../types/user";
import { Button } from "../../../ui/button";
import CustomInput from "../../../ui/forms/custom-input";
import Badge from "../../../ui/badge";
import { ConfirmDialog } from "../../../ui/confirm-dialog";

interface MembersPanelProps {
  workbench: IWorkbench;
}

export function MembersPanel({ workbench }: MembersPanelProps) {
  const { addMember, removeMember, updateMemberRole } = useWorkbenchStore();
  const { maxCollaborators, isUnlimited } = usePlanLimits();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Pick<IUser, "_id" | "username" | "email" | "avatar">[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [targetMember, setTargetMember] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const currentMembersCount = workbench.members?.length || 0;
  const isLimitReached = !isUnlimited("collaborators") && currentMembersCount >= maxCollaborators;

  const handleSearch = useCallback(async (query: string) => {
    if (!query || query.length < 3 || isLimitReached) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const { data, error } = await searchUsers(query);
      if (!error && data?.data) {
        setSearchResults(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  }, [isLimitReached]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery, handleSearch]);

  const handleAddMember = async (
    user: Pick<IUser, "_id" | "username" | "email" | "avatar">,
  ) => {
    if (!workbench._id) return;
    const { success, message } = await addMember(
      workbench._id,
      user._id,
      "viewer",
    );
    if (!success) {
      alert(message || "Failed to add member");
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleRemoveMember = async () => {
    if (!targetMember || !workbench._id) return;
    const { success, message } = await removeMember(
      workbench._id,
      targetMember.id,
    );
    if (!success) {
      alert(message || "Failed to remove member");
    }
    setTargetMember(null);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!workbench._id) return;
    const { success, message } = await updateMemberRole(
      workbench._id,
      userId,
      newRole,
    );
    if (!success) {
      alert(message || "Failed to update role");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Workspace Members
          </h2>
          <p className="text-sm text-foreground/60">
            Manage who has access to this workspace and their permissions.
          </p>
        </div>
      </div>

      {/* Add Member Search */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground">
            Add new members
          </label>
          {isLimitReached && (
            <Badge variant="destructive" className="text-[10px]">
              Limit reached ({maxCollaborators})
            </Badge>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-foreground/40" />
          </div>
          <CustomInput
            type="text"
            placeholder={isLimitReached ? "Member limit reached for your plan" : "Search by username or email..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLimitReached}
          />
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.length >= 3 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-md border border-border/50 bg-background shadow-lg overflow-hidden">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-foreground/60">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="max-h-60 overflow-auto divide-y divide-border/50">
                {searchResults.map((user) => {
                  const isAlreadyMember = workbench.members?.some((m) => {
                    const memberUserId =
                      typeof m.userId === "string" ? m.userId : m.userId._id;
                    return memberUserId === user._id;
                  });
                  return (
                    <li
                      key={user._id}
                      className="flex items-center justify-between p-3 hover:bg-foreground/5"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.avatar ||
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                              user.username
                          }
                          alt={user.username}
                          className="w-8 h-8 rounded-full border border-border"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {user.username}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isAlreadyMember}
                        onClick={() => handleAddMember(user)}
                      >
                        {isAlreadyMember ? (
                          "Added"
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" /> Add
                          </>
                        )}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-foreground/60">
                No users found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Members List */}
      <div className="rounded-xl border border-border/50 bg-background overflow-hidden">
        <ul className="divide-y divide-border/50">
          {workbench.members?.map((member) => {
            const user =
              typeof member.userId === "string"
                ? {
                    _id: member.userId,
                    username: "Unknown",
                    email: "",
                    avatar: "",
                  }
                : member.userId;
            const isOwner = member.role === "owner";

            return (
              <li
                key={member._id || user._id}
                className="flex items-center justify-between p-4 hover:bg-foreground/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.avatar ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                        user.username
                    }
                    alt={user.username}
                    className="w-10 h-10 rounded-full border border-border"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {user.username}
                      </p>
                      {isOwner && (
                        <Badge
                          variant="accent"
                          className="text-[10px] px-1.5 py-0"
                        >
                          Owner
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-foreground/60">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {!isOwner ? (
                    <select
                      className="text-sm bg-transparent border-none text-foreground/80 focus:ring-0 cursor-pointer p-0 pr-4"
                      value={member.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  ) : (
                    <span className="text-sm text-foreground/60">Owner</span>
                  )}

                  {!isOwner && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                      onClick={() =>
                        setTargetMember({ id: user._id, name: user.username })
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <ConfirmDialog
        isOpen={!!targetMember}
        onCancel={() => setTargetMember(null)}
        onConfirm={handleRemoveMember}
        title="Remove Member"
        description={`Are you sure you want to remove ${targetMember?.name} from this workspace? They will lose access immediately.`}
        confirmLabel="Remove"
        isDestructive={true}
      />
    </div>
  );
}
