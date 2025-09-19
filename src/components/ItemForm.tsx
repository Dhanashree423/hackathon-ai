import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";

export interface LostFoundItem {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  contactInfo: string;
  status: "lost" | "found";
  resolved: boolean;
  dateCreated: string;
}

interface ItemFormProps {
  onClose: () => void;
  onSubmit: (item: Omit<LostFoundItem, "id" | "resolved" | "dateCreated">) => void;
}

const ItemForm = ({ onClose, onSubmit }: ItemFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    contactInfo: "",
    status: "" as "lost" | "found" | "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.contactInfo.trim()) newErrors.contactInfo = "Contact info is required";
    if (!formData.status) newErrors.status = "Status is required";

    // Validate email or phone in contact info
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (formData.contactInfo && !emailRegex.test(formData.contactInfo) && !phoneRegex.test(formData.contactInfo)) {
      newErrors.contactInfo = "Please enter a valid email or phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    onSubmit(formData as Omit<LostFoundItem, "id" | "resolved" | "dateCreated">);
    setFormData({
      name: "",
      description: "",
      date: "",
      location: "",
      contactInfo: "",
      status: "",
    });
    setErrors({});
    toast.success(`${formData.status === "lost" ? "Lost" : "Found"} item reported successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-card-hover)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Report Item</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., iPhone 13, Blue Backpack, Car Keys"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed description including color, brand, distinctive features..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            {/* Date and Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={errors.date ? "border-destructive" : ""}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "lost" | "found") => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className={errors.status ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Library 2nd Floor, Student Union, Parking Lot B"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information *</Label>
              <Input
                id="contactInfo"
                placeholder="Email or phone number"
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                className={errors.contactInfo ? "border-destructive" : ""}
              />
              {errors.contactInfo && <p className="text-sm text-destructive">{errors.contactInfo}</p>}
              <p className="text-xs text-muted-foreground">
                Your contact info will be visible to help with item recovery
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                className={`flex-1 ${
                  formData.status === "lost" 
                    ? "bg-warning hover:bg-warning/90 text-warning-foreground" 
                    : formData.status === "found"
                    ? "bg-success hover:bg-success/90 text-success-foreground"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Report {formData.status ? (formData.status === "lost" ? "Lost" : "Found") : ""} Item
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemForm;