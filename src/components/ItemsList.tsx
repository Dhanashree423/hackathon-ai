import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import ItemCard from "./ItemCard";
import { LostFoundItem } from "./ItemForm";

interface ItemsListProps {
  items: LostFoundItem[];
  filter: "all" | "lost" | "found";
  onFilterChange: (filter: "all" | "lost" | "found") => void;
  onMarkResolved: (id: string) => void;
  onUndoResolved: (id: string) => void;
}

const ItemsList = ({ items, filter, onFilterChange, onMarkResolved, onUndoResolved }: ItemsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "created">("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showResolved, setShowResolved] = useState(false);

  // Filter and search items
  const filteredItems = items.filter((item) => {
    // Filter by status
    if (filter !== "all" && item.status !== filter) return false;
    
    // Filter by resolved status
    if (!showResolved && item.resolved) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;

    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "date":
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case "created":
      default:
        aValue = new Date(a.dateCreated);
        bValue = new Date(b.dateCreated);
        break;
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (newSortBy: "date" | "name" | "created") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const lostCount = items.filter(item => item.status === "lost" && !item.resolved).length;
  const foundCount = items.filter(item => item.status === "found" && !item.resolved).length;
  const resolvedCount = items.filter(item => item.resolved).length;

  return (
    <section id="items" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Campus Items
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through reported lost and found items. Use the search and filters to find what you're looking for.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-foreground">{items.length}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-warning">{lostCount}</div>
            <div className="text-sm text-muted-foreground">Lost Items</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-success">{foundCount}</div>
            <div className="text-sm text-muted-foreground">Found Items</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-muted-foreground">{resolvedCount}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8 shadow-[var(--shadow-card)]">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search items by name, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => onFilterChange("all")}
              className={filter === "all" ? "" : "hover:bg-muted"}
            >
              All Items
              <Badge variant="secondary" className="ml-2">
                {items.filter(item => !showResolved ? !item.resolved : true).length}
              </Badge>
            </Button>
            <Button
              variant={filter === "lost" ? "destructive" : "outline"}
              onClick={() => onFilterChange("lost")}
              className={filter === "lost" 
                ? "bg-warning hover:bg-warning/90 text-warning-foreground" 
                : "hover:bg-warning/10 hover:text-warning hover:border-warning/30"
              }
            >
              Lost Items
              <Badge variant="secondary" className="ml-2">
                {lostCount}
              </Badge>
            </Button>
            <Button
              variant={filter === "found" ? "default" : "outline"}
              onClick={() => onFilterChange("found")}
              className={filter === "found" 
                ? "bg-success hover:bg-success/90 text-success-foreground" 
                : "hover:bg-success/10 hover:text-success hover:border-success/30"
              }
            >
              Found Items
              <Badge variant="secondary" className="ml-2">
                {foundCount}
              </Badge>
            </Button>
          </div>

          {/* Sort and Additional Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort by:</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort("created")}
              className={sortBy === "created" ? "bg-muted" : ""}
            >
              Date Added
              {sortBy === "created" && (
                sortOrder === "asc" ? <SortAsc className="w-3 h-3 ml-1" /> : <SortDesc className="w-3 h-3 ml-1" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort("date")}
              className={sortBy === "date" ? "bg-muted" : ""}
            >
              Incident Date
              {sortBy === "date" && (
                sortOrder === "asc" ? <SortAsc className="w-3 h-3 ml-1" /> : <SortDesc className="w-3 h-3 ml-1" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort("name")}
              className={sortBy === "name" ? "bg-muted" : ""}
            >
              Name
              {sortBy === "name" && (
                sortOrder === "asc" ? <SortAsc className="w-3 h-3 ml-1" /> : <SortDesc className="w-3 h-3 ml-1" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResolved(!showResolved)}
              className={showResolved ? "bg-muted" : ""}
            >
              {showResolved ? "Hide" : "Show"} Resolved
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onMarkResolved={onMarkResolved}
                onUndoResolved={onUndoResolved}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-20">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchQuery ? "No matching items found" : "No items yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? "Try adjusting your search terms or filters"
                : "Be the first to report a lost or found item!"
              }
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemsList;