import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/store/auth";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    workspace: "",
    preferences: {
      role: "blogger",
    },
  });

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const updatePreferences = (updates: Partial<typeof formData.preferences>) => {
    setFormData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates },
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || formData.password.length < 8) {
        setError("Please fill in all required fields correctly.");
        return;
      }
    }
    setError(null);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const submitForm = async () => {
    setError(null);
    const response = await register({
      username: formData.name,
      email: formData.email,
      password: formData.password,
      workspace: formData.workspace,
      preferences: formData.preferences,
    });

    if (response.success && response.data) {
      navigate("/auth/verify-email", { 
        state: { 
          email: response.data.email,
          username: response.data.username,
          expiresIn: response.data.tokenExpiresIn
        } 
      });
    } else {
      setError(response.error || "Registration failed. Please try again.");
    }
  };

  return {
    step,
    formData,
    loading,
    error,
    updateForm,
    updatePreferences,
    nextStep,
    prevStep,
    submitForm,
  };
};
