import { ArrowLeftIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../../ui/forms/custom-input";
import { Button } from "../../ui/button";
import Notifications from "./notifications";

interface Props {
  title: string;
  description?: string;
  backHref?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  extraActions?: React.ReactNode;
}

export function Header({ title, description, backHref, action, extraActions }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              to={backHref}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Back</span>
            </Link>
          )}
          {backHref && <div className="h-6 w-px bg-border" />}
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <CustomInput
              type="search"
              placeholder="Search..."
              className="w-64 bg-secondary pl-9"
            />
          </div>
          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          {extraActions}
          <Notifications />

          {action && (
            <Button
              onClick={action.onClick}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          )}
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border p-4 md:hidden">
          <CustomInput
            type="search"
            placeholder="Search..."
            className="w-full bg-secondary"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
