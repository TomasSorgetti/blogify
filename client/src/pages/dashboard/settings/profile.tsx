import { CameraIcon, Loader2Icon, UserIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { ImageCropper } from "../../../components/ui/image-cropper";
import { Modal } from "../../../components/ui/modal";
import CustomInput from "../../../components/ui/forms/custom-input";
import CustomLabel from "../../../components/ui/forms/custom-label";
import CustomTextarea from "../../../components/ui/forms/custom-textarea";
import { useAuthStore } from "../../../lib/store/auth";
import { UpdateProfile } from "../../../lib/services/user";
import type { IUser } from "../../../types/user";

function ProfileForm({
  user,
  setUser,
}: {
  user: IUser;
  setUser: (updatedUser: IUser) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || "",
    bio: user.bio || "",
  });

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasChanges =
    formData.username !== (user.username || "") || formData.bio !== (user.bio || "");

  const handleSave = async () => {
    setLoading(true);
    const { data, error } = await UpdateProfile(formData);

    if (error) {
      toast.error(error || "Failed to update profile");
    } else if (data?.data) {
      toast.success("Profile updated!");
      setUser(data.data);
    }
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = async (croppedBlob: Blob) => {
    setCropModalOpen(false);
    setUploadingImage(true);
    const toastId = toast.loading("Uploading avatar...");

    try {
      const { data, error } = await UpdateProfile({
        username: formData.username,
        bio: formData.bio,
        image: croppedBlob,
      });

      if (error) {
        toast.error(error || "Failed to upload avatar", { id: toastId });
      } else if (data?.data) {
        toast.success("Avatar updated!", { id: toastId });
        setUser(data.data);
      }
    } catch {
      toast.error("An unexpected error occurred", { id: toastId });
    } finally {
      setUploadingImage(false);
      setSelectedImage(null);
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-border/70 bg-secondary/20 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-border transition-all hover:border-accent"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="h-full w-full object-cover transition-opacity group-hover:opacity-60"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-muted-foreground transition-opacity group-hover:opacity-40" />
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <div className="rounded-full bg-background/80 p-2 shadow-sm">
                <CameraIcon className="h-5 w-5 text-foreground" />
              </div>
            </div>
            {uploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                <Loader2Icon className="h-6 w-6 animate-spin text-accent" />
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="space-y-1">
            <h3 className="font-medium">Profile picture</h3>
            <p className="text-sm text-muted-foreground">
              Click your avatar to upload a new one. JPEG, PNG, or WebP up to 2MB.
            </p>
          </div>
        </div>
      </section>

      <Modal
        isOpen={cropModalOpen}
        onClose={() => {
          setCropModalOpen(false);
          setSelectedImage(null);
        }}
        title="Crop your avatar"
      >
        {selectedImage && (
          <ImageCropper
            image={selectedImage}
            onCropComplete={onCropComplete}
            onCancel={() => {
              setCropModalOpen(false);
              setSelectedImage(null);
            }}
            circular
          />
        )}
      </Modal>

      <section className="grid gap-4 rounded-xl border border-border/70 bg-card/70 p-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <CustomLabel htmlFor="username">Username</CustomLabel>
          <CustomInput
            id="username"
            value={formData.username}
            onChange={(event) =>
              setFormData({ ...formData, username: event.target.value })
            }
            className="bg-secondary"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <CustomLabel htmlFor="email">Email</CustomLabel>
          <CustomInput
            id="email"
            type="email"
            value={user.email || ""}
            disabled
            className="cursor-not-allowed bg-secondary opacity-55"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed from this screen.
          </p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <CustomLabel htmlFor="bio">Bio</CustomLabel>
          <CustomTextarea
            id="bio"
            rows={4}
            maxLength={500}
            value={formData.bio}
            onChange={(event) => setFormData({ ...formData, bio: event.target.value })}
            className="bg-secondary"
            placeholder="Tell others what you work on..."
          />
          <p className="text-right text-xs text-muted-foreground">
            {formData.bio.length}/500
          </p>
        </div>
      </section>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading || !formData.username || !hasChanges}
          className="w-full bg-foreground text-background hover:bg-foreground/90 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </div>
  );
}

export default function ProfileSettings() {
  const { user, setUser } = useAuthStore();

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border/60 bg-card/60">
        <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold">Profile Settings</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update your public identity and personal information.
      </p>

      <div className="mt-5">
        <ProfileForm key={user._id} user={user} setUser={setUser} />
      </div>
    </div>
  );
}
