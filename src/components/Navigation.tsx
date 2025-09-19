import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Plus } from "lucide-react";

interface NavigationProps {
  onFilterChange: (filter: "all" | "lost" | "found") => void;
  onShowForm: () => void;
  currentFilter: "all" | "lost" | "found";
}

const Navigation = ({ onFilterChange, onShowForm, currentFilter }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-[var(--shadow-nav)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">Campus Lost & Found</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                onFilterChange("all");
                scrollToSection("items");
              }}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                currentFilter === "all" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => {
                onFilterChange("lost");
                scrollToSection("items");
              }}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-warning ${
                currentFilter === "lost" ? "text-warning" : "text-muted-foreground"
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => {
                onFilterChange("found");
                scrollToSection("items");
              }}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-success ${
                currentFilter === "found" ? "text-success" : "text-muted-foreground"
              }`}
            >
              Found Items
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button onClick={onShowForm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Report Item
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            <button
              onClick={() => {
                onFilterChange("all");
                scrollToSection("items");
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                currentFilter === "all" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => {
                onFilterChange("lost");
                scrollToSection("items");
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors hover:text-warning ${
                currentFilter === "lost" ? "text-warning" : "text-muted-foreground"
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => {
                onFilterChange("found");
                scrollToSection("items");
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors hover:text-success ${
                currentFilter === "found" ? "text-success" : "text-muted-foreground"
              }`}
            >
              Found Items
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <div className="pt-2">
              <Button onClick={onShowForm} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Report Item
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;