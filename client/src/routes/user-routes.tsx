import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import SettingsPage from "../pages/dashboard/settings";
import ProfileSettings from "../pages/dashboard/settings/profile";
import BillingSettings from "../pages/dashboard/settings/billing";
import NotificationSettings from "../pages/dashboard/settings/notifications";
import SecuritySettings from "../pages/dashboard/settings/security";
import WorkspacesPage from "../pages/dashboard/workspaces";
import WorkbenchDetailPage from "../pages/dashboard/workspaces/workbench-detail";
import WorkbenchSettingsPage from "../pages/dashboard/workspaces/settings";
import WorkspaceApiKeysPage from "../pages/dashboard/workspaces/api-keys";
import WorkspaceAnalyticsPage from "../pages/dashboard/workspaces/analytics";
import WorkspaceKanbanPage from "../pages/dashboard/workspaces/kanban";
import PrivateGuard from "../components/guards/PrivateGuard";
import NewArticlePage from "../pages/dashboard/articles/new";
import EditArticlePage from "../pages/dashboard/articles/edit";
import AiPage from "../pages/dashboard/ai";

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PrivateGuard>
            <DashboardPage />
          </PrivateGuard>
        }
      />

      {/* Settings with nested routes */}
      <Route
        path="settings"
        element={
          <PrivateGuard>
            <SettingsPage />
          </PrivateGuard>
        }
      >
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="billing" element={<BillingSettings />} />
        <Route path="notifications" element={<NotificationSettings />} />
        <Route path="security" element={<SecuritySettings />} />
      </Route>

      <Route
        path="workspaces"
        element={
          <PrivateGuard>
            <WorkspacesPage />
          </PrivateGuard>
        }
      />
      <Route
        path="workspaces/:workbenchId"
        element={
          <PrivateGuard>
            <WorkbenchDetailPage />
          </PrivateGuard>
        }
      />
      <Route
        path="workspaces/:workbenchId/settings"
        element={
          <PrivateGuard>
            <WorkbenchSettingsPage />
          </PrivateGuard>
        }
      />
      <Route
        path="workspaces/:workbenchId/articles/new"
        element={
          <PrivateGuard>
            <NewArticlePage />
          </PrivateGuard>
        }
      />
      <Route
        path="workspaces/:workbenchId/articles/:articleSlug"
        element={
          <PrivateGuard>
            <EditArticlePage />
          </PrivateGuard>
        }
      />
      <Route
        path="workspaces/:workbenchId/stats"
        element={
          <PrivateGuard>
            <WorkspaceAnalyticsPage />
          </PrivateGuard>
        }
      />
      <Route
        path="workspaces/:workbenchId/api-keys"
        element={
          <PrivateGuard>
            <WorkspaceApiKeysPage />
          </PrivateGuard>
        }
      />
      <Route
        path="workspaces/:workbenchId/kanban"
        element={
          <PrivateGuard>
            <WorkspaceKanbanPage />
          </PrivateGuard>
        }
      />
      <Route
        path="ai"
        element={
          <PrivateGuard>
            <AiPage />
          </PrivateGuard>
        }
      />
    </Routes>
  );
}
