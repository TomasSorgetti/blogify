import { CheckIcon } from "lucide-react";
import CustomInput from "../../ui/forms/custom-input";
import CustomLabel from "../../ui/forms/custom-label";

export const StepIndicator = ({ currentStep, totalSteps = 2 }: { currentStep: number; totalSteps?: number }) => (
  <div className="mb-6 flex items-center justify-center gap-2">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 w-12 rounded-full ${
          currentStep >= i + 1 ? "bg-foreground" : "bg-secondary"
        }`}
      />
    ))}
  </div>
);

interface FormState {
  name: string;
  email: string;
  password: string;
  workspace: string;
  preferences: {
    role: string;
  };
}

export const AccountStep = ({
  formData,
  updateForm,
}: {
  formData: FormState;
  updateForm: (updates: Partial<FormState>) => void;
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <CustomLabel htmlFor="name">Full name</CustomLabel>
      <CustomInput
        id="name"
        type="text"
        placeholder="John Doe"
        required
        value={formData.name}
        onChange={(e) => updateForm({ name: e.target.value })}
        className="bg-secondary"
      />
    </div>
    <div className="space-y-2">
      <CustomLabel htmlFor="email">Email</CustomLabel>
      <CustomInput
        id="email"
        type="email"
        placeholder="you@example.com"
        required
        value={formData.email}
        onChange={(e) => updateForm({ email: e.target.value })}
        className="bg-secondary"
      />
    </div>
    <div className="space-y-2">
      <CustomLabel htmlFor="password">Password</CustomLabel>
      <CustomInput
        id="password"
        type="password"
        placeholder="••••••••"
        required
        minLength={8}
        value={formData.password}
        onChange={(e) => updateForm({ password: e.target.value })}
        className="bg-secondary"
      />
      <p className="text-xs text-muted-foreground">
        Minimum 8 characters
      </p>
    </div>
  </div>
);

export const WorkspaceStep = ({
  formData,
  updateForm,
  updatePreferences,
}: {
  formData: FormState;
  updateForm: (updates: Partial<FormState>) => void;
  updatePreferences: (updates: Partial<FormState["preferences"]>) => void;
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <CustomLabel htmlFor="workspace">
        Workspace name
      </CustomLabel>
      <CustomInput
        id="workspace"
        type="text"
        placeholder="My Blog"
        required
        value={formData.workspace}
        onChange={(e) => updateForm({ workspace: e.target.value })}
        className="bg-secondary"
      />
    </div>
    <div className="space-y-2">
      <CustomLabel htmlFor="role">
        What describes you best?
      </CustomLabel>
      <select
        id="role"
        value={formData.preferences.role}
        onChange={(e) => updatePreferences({ role: e.target.value })}
        className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm"
      >
        <option value="blogger">Individual blogger</option>
        <option value="team">Content team</option>
        <option value="agency">Agency</option>
        <option value="enterprise">Enterprise</option>
      </select>
    </div>
  </div>
);

export const BenefitsList = ({ benefits }: { benefits: string[] }) => (
  <>
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">
        What you get
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>

    <ul className="space-y-2">
      {benefits.map((benefit) => (
        <li
          key={benefit}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <CheckIcon className="h-4 w-4 text-accent" />
          {benefit}
        </li>
      ))}
    </ul>
  </>
);
