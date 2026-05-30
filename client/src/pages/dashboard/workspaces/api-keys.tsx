import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import { usePlanLimits } from "../../../hooks/use-plan-limits";
import { Button } from "../../../components/ui/button";
import { Header } from "../../../components/sections/dashboard/header";
import { Key, Lock } from "lucide-react";
import { SecurityInfo } from "../../../components/sections/dashboard/api-keys/security-info";
import { ApiKeyItem } from "../../../components/sections/dashboard/api-keys/api-key-item";
import { CreateKeyModal } from "../../../components/sections/dashboard/api-keys/create-key-modal";
import { UsageBar } from "../../../components/ui/usage-bar";
import WorkspaceSubNav from "../../../components/sections/dashboard/workspaces/workspace-sub-nav";
import {
  useApiKeys,
  useCreateApiKey,
  useRevokeApiKey,
} from "../../../hooks/queries/use-api-keys";
import { useWorkbench } from "../../../hooks/queries/use-workspaces";
import { useCopyToClipboard } from "../../../hooks/use-copy-to-clipboard";
import { useToggleVisibility } from "../../../hooks/use-toggle-visibility";
import { useWorkspacePermissions } from "../../../hooks/use-workspace-permissions";
import { ApiKeyListSkeleton } from "../../../components/sections/dashboard/api-keys/api-key-skeleton";

export default function WorkspaceApiKeysPage() {
  const { workbenchId } = useParams<{ workbenchId: string }>();
  const navigate = useNavigate();

  const { data: apiKeys = [], isLoading: loadingKeys } =
    useApiKeys(workbenchId);
  const { data: workbench, isLoading: loadingWorkbench } = useWorkbench(
    workbenchId!,
  );

  const { mutateAsync: generateKey } = useCreateApiKey();
  const { mutateAsync: revokeKey } = useRevokeApiKey();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const { copy, isCopied } = useCopyToClipboard();
  const { toggle, isVisible } = useToggleVisibility();

  const { isOwner } = useWorkspacePermissions(workbench);

  const { maxApiKeys, isUnlimited } = usePlanLimits();
  const unlimitedKeys = isUnlimited("apiKeys");
  const hasReachedLimit = !unlimitedKeys && apiKeys.length >= maxApiKeys;
  const hasNoAccess = !unlimitedKeys && maxApiKeys === 0;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim() || !workbenchId) return;

    try {
      await generateKey({ name: newKeyName, workbenchId });
      setNewKeyName("");
      setIsModalOpen(false);
    } catch {
      // Error handled by mutation hook (toast)
    }
  };

  const loading = loadingKeys || loadingWorkbench;

  if (!loading && workbench && !isOwner) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
          <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Only the owner of this workspace can manage API keys.
          </p>
          <Button
            onClick={() => navigate(`/dashboard/workspaces/${workbenchId}`)}
          >
            Return to Workspace
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header
        title="API Keys"
        description={workbench?.name || "Workspace"}
        backHref={`/dashboard/workspaces/${workbenchId}`}
        action={
          !hasNoAccess && !hasReachedLimit
            ? {
                label: "Generate New Key",
                onClick: () => setIsModalOpen(true),
              }
            : hasReachedLimit || hasNoAccess
              ? {
                  label: "Upgrade Plan",
                  onClick: () => navigate("/dashboard/billing"),
                }
              : undefined
        }
      />

      <WorkspaceSubNav workbenchId={workbenchId!} />

      <main className="max-w-6xl mx-auto py-8 px-6 space-y-8">
        <UsageBar
          label="API Key Usage"
          current={apiKeys.length}
          max={maxApiKeys}
          isUnlimited={unlimitedKeys}
          className="mt-0"
        />
        <SecurityInfo />

        {loading && apiKeys.length === 0 ? (
          <ApiKeyListSkeleton />
        ) : apiKeys.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-card/20 backdrop-blur-sm">
            <div className="h-16 w-16 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Key className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">No API keys found</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              You haven't generated any API keys for this workspace yet.
            </p>
            {isOwner && (
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                Create your first key
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {apiKeys?.map((apiKey) => (
              <ApiKeyItem
                key={apiKey._id}
                apiKey={apiKey}
                isVisible={isVisible(apiKey._id)}
                isCopied={isCopied(apiKey._id)}
                onToggleVisibility={() => toggle(apiKey._id)}
                onCopy={() => copy(apiKey.key, apiKey._id)}
                onRevoke={() => revokeKey(apiKey.key)}
              />
            ))}
          </div>
        )}

        <CreateKeyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          nameValue={newKeyName}
          onNameChange={setNewKeyName}
          onSubmit={handleCreate}
        />
      </main>
    </DashboardLayout>
  );
}
