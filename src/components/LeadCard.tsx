import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Sprout, Phone, Eye, Clock, Package, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LeadCardProps {
  lead: any;
  category: string;
}

const LeadCard = ({ lead, category }: LeadCardProps) => {
  const navigate = useNavigate();

  const getCategoryIcon = () => {
    switch (category) {
      case "seasonal":
        return <Clock className="h-4 w-4 text-success" />;
      case "pending":
        return <Package className="h-4 w-4 text-warning" />;
      case "payment":
        return <CreditCard className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  const getCategoryBadge = () => {
    switch (category) {
      case "seasonal":
        return <Badge className="bg-success text-success-foreground">Seasonal</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending Dispatch</Badge>;
      case "payment":
        return <Badge variant="default">Payment Complete</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {getCategoryIcon()}
              <h3 className="text-xl font-semibold">{lead.name}</h3>
              {getCategoryBadge()}
              {lead.priority === "high" && (
                <Badge variant="destructive">High Priority</Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {lead.location}
              </span>
              <span className="flex items-center gap-1">
                <Sprout className="h-3 w-3" />
                {lead.crop}
              </span>
            </div>

            <div className="p-3 bg-accent/50 rounded-md mb-3">
              <p className="text-sm font-medium text-accent-foreground mb-1">AI Reason:</p>
              <p className="text-sm text-foreground">{lead.reason}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {lead.lastTransaction && (
                <div>
                  <span className="text-muted-foreground">Last Transaction:</span>
                  <p className="font-medium">{lead.lastTransaction}</p>
                </div>
              )}
              {lead.poNumber && (
                <div>
                  <span className="text-muted-foreground">PO Number:</span>
                  <p className="font-medium font-mono text-xs">{lead.poNumber}</p>
                </div>
              )}
              {lead.paymentStatus && (
                <div>
                  <span className="text-muted-foreground">Payment:</span>
                  <p className="font-medium">{lead.paymentStatus}</p>
                </div>
              )}
              {lead.orderValue && (
                <div>
                  <span className="text-muted-foreground">Order Value:</span>
                  <p className="font-medium">{lead.orderValue}</p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Assigned To:</span>
                <p className="font-medium">{lead.assignedTo}</p>
              </div>
              {lead.similarBuyers && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Similar Buyers:</span>
                  <p className="font-medium">{lead.similarBuyers.join(", ")}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex md:flex-col gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => navigate(`/supplier/${lead.id}`)}
              className="flex-1 md:flex-none"
            >
              <Eye className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">View</span>
            </Button>
            <Button size="sm" className="flex-1 md:flex-none">
              <Phone className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Call</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCard;