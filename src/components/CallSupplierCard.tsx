import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Sprout, Clock, Eye, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TriggerNotificationDialog from "./TriggerNotificationDialog";

interface CallSupplierCardProps {
  supplier: {
    id: number;
    name: string;
    phone: string;
    location: string;
    crop: string;
    priority: string;
    reason: string;
    lastContact: string;
    assignedTime: string;
  };
  onCallComplete: (supplierId: number, outcome: "success" | "failed" | "callback") => void;
}

const CallSupplierCard = ({ supplier, onCallComplete }: CallSupplierCardProps) => {
  const navigate = useNavigate();
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);

  const handleCall = () => {
    // In real app, this would initiate the call
    window.location.href = `tel:${supplier.phone}`;
    setShowCallOptions(true);
  };

  return (
    <>
      <Card className="transition-all duration-300 hover:shadow-md border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-semibold">{supplier.name}</h3>
                {supplier.priority === "high" && (
                  <Badge variant="destructive">High Priority</Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {supplier.assignedTime}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {supplier.location}
                </span>
                <span className="flex items-center gap-1">
                  <Sprout className="h-3 w-3" />
                  {supplier.crop}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {supplier.phone}
                </span>
              </div>

              <div className="p-3 bg-accent/50 rounded-md mb-3">
                <p className="text-sm font-medium text-accent-foreground mb-1">Call Reason:</p>
                <p className="text-sm text-foreground">{supplier.reason}</p>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">Last Contact: </span>
                <span className="font-medium">{supplier.lastContact}</span>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigate(`/supplier/${supplier.id}`)}
                className="flex-1 lg:flex-none"
              >
                <Eye className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">View Details</span>
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => setIsNotificationDialogOpen(true)}
                className="flex-1 lg:flex-none"
              >
                <Bell className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Notify</span>
              </Button>
              <Button 
                size="sm"
                onClick={handleCall}
                className="flex-1 lg:flex-none bg-success hover:bg-success/90 text-success-foreground"
              >
                <Phone className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Call Now</span>
              </Button>
            </div>
          </div>

          {showCallOptions && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-3">Mark call outcome:</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  onClick={() => onCallComplete(supplier.id, "success")}
                  className="bg-success hover:bg-success/90"
                >
                  Successful
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onCallComplete(supplier.id, "callback")}
                >
                  Schedule Callback
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onCallComplete(supplier.id, "failed")}
                >
                  Failed to Reach
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <TriggerNotificationDialog
        open={isNotificationDialogOpen}
        onOpenChange={setIsNotificationDialogOpen}
        supplierName={supplier.name}
        supplierId={supplier.id}
      />
    </>
  );
};

export default CallSupplierCard;