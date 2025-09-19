import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ItemForm, { LostFoundItem } from "@/components/ItemForm";
import ItemsList from "@/components/ItemsList";
import About from "@/components/About";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [filter, setFilter] = useState<"all" | "lost" | "found">("all");

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("campusLostFound");
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setItems(parsedItems);
      } catch (error) {
        console.error("Error loading items from localStorage:", error);
      }
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("campusLostFound", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem: Omit<LostFoundItem, "id" | "resolved" | "dateCreated">) => {
    const item: LostFoundItem = {
      ...newItem,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      resolved: false,
      dateCreated: new Date().toISOString(),
    };
    setItems(prevItems => [item, ...prevItems]);
  };

  const handleMarkResolved = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, resolved: true } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onFilterChange={setFilter}
        onShowForm={() => setShowForm(true)}
        currentFilter={filter}
      />
      
      <main>
        <Hero onShowForm={() => setShowForm(true)} />
        
        <ItemsList 
          items={items}
          filter={filter}
          onFilterChange={setFilter}
          onMarkResolved={handleMarkResolved}
        />
        
        <About />
      </main>

      {showForm && (
        <ItemForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddItem}
        />
      )}
    </div>
  );
};

export default Index;
