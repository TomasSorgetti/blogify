import { Search, Filter, ChevronDown, X } from "lucide-react";
import CustomInput from "../../ui/forms/custom-input";
import CustomLabel from "../../ui/forms/custom-label";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const categoryGroups = {
  "Content & Strategy": ["Strategy", "SEO", "Marketing", "Analytics"],
  Technology: ["AI", "API", "Development", "Tutorial"],
  "Teams & Productivity": ["Teams", "Collaboration", "Productivity", "Tips"],
  Product: ["Product Update", "Writing", "Data"],
};

interface BlogSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearFilters: () => void;
}

export function BlogSearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
}: BlogSearchFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-12 pt-4">
      <div className="relative w-full lg:w-96">
        <CustomLabel htmlFor="search" className="sr-only">
          Search
        </CustomLabel>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <CustomInput
          id="search"
          placeholder="Search articles..."
          className="pl-10 bg-card border-border"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Categories
              {selectedCategories.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-accent text-accent-foreground">
                  {selectedCategories.length}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {Object.entries(categoryGroups).map(([group, categories], groupIndex) => (
              <div key={group}>
                {groupIndex > 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
                  {group}
                </DropdownMenuLabel>
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => onCategoryToggle(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            ))}
            {selectedCategories.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <button
                  onClick={onClearFilters}
                  className="w-full px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground text-left flex items-center gap-2"
                >
                  <X className="w-3 h-3" />
                  Clear all filters
                </button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Active filter pills */}
        {selectedCategories.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-2">
            {selectedCategories.slice(0, 3).map((category) => (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors flex items-center gap-1.5"
              >
                {category}
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedCategories.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                +{selectedCategories.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
