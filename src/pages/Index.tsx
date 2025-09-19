import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ItemForm, { LostFoundItem } from "@/components/ItemForm";
import ItemsList from "@/components/ItemsList";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [filter, setFilter] = useState<"all" | "lost" | "found">("all");

  // Load items from localStorage on component mount
  useEffect(() => {
    const defaultItems: LostFoundItem[] = [
      {
        id: "seed-1",
        name: "Black Wallet",
        description: "Leather wallet with student ID and a few cards inside.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        location: "Library - 2nd Floor",
        contactInfo: "alex@example.com",
        status: "lost",
        resolved: false,
        dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      },
      {
        id: "seed-2",
        name: "Water Bottle (Blue)",
        description: "Blue Hydro Flask with 'CS Dept' sticker.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        location: "Gym - Court A",
        contactInfo: "+1 (555) 010-2233",
        status: "found",
        resolved: false,
        dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      },
      {
        id: "seed-3",
        name: "AirPods Case",
        description: "White case only, no earbuds inside.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        location: "Student Union - Cafe",
        contactInfo: "found-items@example.com",
        status: "found",
        resolved: false,
        dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
      },
      {
        id: "seed-4",
        name: "Backpack (Gray)",
        description: "Gray backpack with math textbook, calculator, and notebook.",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        location: "Engineering Building - Room 204",
        contactInfo: "+1 555 010 7788",
        status: "lost",
        resolved: false,
        dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      },
    ];

    const savedItems = localStorage.getItem("campusLostFound");
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems);
        } else {
          setItems(defaultItems);
          localStorage.setItem("campusLostFound", JSON.stringify(defaultItems));
        }
      } catch (error) {
        console.error("Error loading items from localStorage:", error);
        // Fallback to defaults on parse error
        setItems(defaultItems);
        localStorage.setItem("campusLostFound", JSON.stringify(defaultItems));
      }
    } else {
      // Seed defaults if nothing stored yet
      setItems(defaultItems);
      localStorage.setItem("campusLostFound", JSON.stringify(defaultItems));
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

  const handleUndoResolved = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, resolved: false } : item
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
          onUndoResolved={handleUndoResolved}
        />
        
        <About />
      </main>

      {showForm && (
        <ItemForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddItem}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;
