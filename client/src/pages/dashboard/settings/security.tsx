import {
  Loader2Icon,
  LockKeyholeIcon,
  ShieldAlertIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import CustomInput from "../../../components/ui/forms/custom-input";
import CustomLabel from "../../../components/ui/forms/custom-label";
import { ChangePassword } from "../../../lib/services/user";

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const hasRequiredFields =
    !!passwords.currentPassword && !!passwords.newPassword && !!passwords.confirmPassword;
  const passwordsMatch = passwords.newPassword === passwords.confirmPassword;
  const isStrongEnough = passwords.newPassword.length >= 8;

  const handleUpdatePassword = async () => {
    if (!passwordsMatch) {
      toast.error("New passwords do not match");
      return;
    }

    if (!isStrongEnough) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const { error } = await ChangePassword({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });

    if (error) {
      toast.error(error || "Failed to update password");
    } else {
      toast.success("Password updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
            <LockKeyholeIcon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Change Password</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use a strong password to protect your account.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <CustomLabel htmlFor="currentPassword">Current password</CustomLabel>
            <CustomInput
              id="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={(event) =>
                setPasswords({ ...passwords, currentPassword: event.target.value })
              }
              className="bg-secondary"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <CustomLabel htmlFor="newPassword">New password</CustomLabel>
              <CustomInput
                id="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={(event) =>
                  setPasswords({ ...passwords, newPassword: event.target.value })
                }
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <CustomLabel htmlFor="confirmPassword">Confirm new password</CustomLabel>
              <CustomInput
                id="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={(event) =>
                  setPasswords({ ...passwords, confirmPassword: event.target.value })
                }
                className="bg-secondary"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-secondary/25 p-3 text-xs text-muted-foreground">
            <p>Password requirements:</p>
            <ul className="mt-1 list-disc pl-4">
              <li className={isStrongEnough ? "text-emerald-400" : ""}>
                At least 8 characters
              </li>
              <li className={passwordsMatch ? "text-emerald-400" : ""}>
                New password and confirmation must match
              </li>
            </ul>
          </div>

          <Button
            onClick={handleUpdatePassword}
            disabled={loading || !hasRequiredFields || !passwordsMatch || !isStrongEnough}
            className="w-full bg-foreground text-background hover:bg-foreground/90 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add an extra layer of security to your account.
        </p>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-border/60 bg-secondary/35 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <ShieldAlertIcon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">2FA Disabled</p>
              <p className="text-sm text-muted-foreground">
                Authenticator app support is coming soon.
              </p>
            </div>
          </div>
          <Button variant="outline" disabled className="opacity-50">
            Coming soon
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-destructive/15 text-destructive">
            <TriangleAlertIcon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>
            <Button
              variant="outline"
              disabled
              className="mt-4 border-destructive text-destructive opacity-50 hover:bg-destructive/10"
            >
              Delete account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
