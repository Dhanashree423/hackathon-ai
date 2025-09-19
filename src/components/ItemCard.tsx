import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { LostFoundItem } from "./ItemForm";
import { toast } from "sonner";

interface ItemCardProps {
  item: LostFoundItem;
  onMarkResolved: (id: string) => void;
}

const ItemCard = ({ item, onMarkResolved }: ItemCardProps) => {
  const handleMarkResolved = () => {
    onMarkResolved(item.id);
    toast.success("Item marked as resolved!");
  };

  const handleContactClick = (contactInfo: string) => {
    if (contactInfo.includes('@')) {
      window.location.href = `mailto:${contactInfo}`;
    } else {
      // Remove any formatting from phone number for tel: link
      const cleanPhone = contactInfo.replace(/[\s\-\(\)]/g, '');
      window.location.href = `tel:${cleanPhone}`;
    }
  };

  const isEmail = item.contactInfo.includes('@');
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className={`group transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02] ${
      item.resolved ? 'bg-muted/50' : 'bg-card'
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-2 ${item.resolved ? 'text-muted-foreground' : 'text-card-foreground'}`}>
              {item.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={item.status === "lost" ? "destructive" : "default"}
                className={
                  item.status === "lost" 
                    ? "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20" 
                    : "bg-success/10 text-success hover:bg-success/20 border-success/20"
                }
              >
                {item.status === "lost" ? "Lost" : "Found"}
              </Badge>
              {item.resolved && (
                <Badge className="bg-success/10 text-success hover:bg-success/20 border-success/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Resolved
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm mb-4 ${item.resolved ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
          {item.description}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatDate(item.date)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            {isEmail ? (
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
            ) : (
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
            )}
            <button
              onClick={() => handleContactClick(item.contactInfo)}
              className="hover:text-primary transition-colors underline"
            >
              {item.contactInfo}
            </button>
          </div>
        </div>

        {/* Action Button */}
        {!item.resolved && (
          <Button
            onClick={handleMarkResolved}
            variant="outline"
            size="sm"
            className="w-full bg-success/5 hover:bg-success/10 text-success border-success/20 hover:border-success/30 transition-all duration-200"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Resolved
          </Button>
        )}

        {/* Created date */}
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Reported on {formatDate(item.dateCreated)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;