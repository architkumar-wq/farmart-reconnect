import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Eye, MapPin, Sprout, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TriggerNotificationDialog from "./TriggerNotificationDialog";

interface SupplierListProps {
  searchQuery: string;
  filter: string;
}

const SupplierList = ({ searchQuery, filter }: SupplierListProps) => {
  const navigate = useNavigate();
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<{ id: number; name: string } | null>(null);

  const mockSuppliers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Nashik, Maharashtra",
      crop: "Maize",
      lastTransaction: "July 2024",
      status: "priority",
      aiReason: "Sold 25 tons 3 months ago, crop in season",
      assignedTo: "Surbhi Sharma",
      buyers: ["Mahesh Edible", "Local Mills"],
      onboardedDate: "May 2023",
      priority: "high"
    },
    {
      id: 2,
      name: "Amit Patel",
      location: "Surat, Gujarat",
      crop: "Cotton",
      lastTransaction: "September 2024",
      status: "pending_dispatch",
      aiReason: "First PO created but not dispatched",
      assignedTo: "Divya Singh",
      buyers: ["Gujarat Textiles"],
      onboardedDate: "August 2024",
      priority: "high"
    },
    {
      id: 3,
      name: "Suresh Reddy",
      location: "Warangal, Telangana",
      crop: "Rice",
      lastTransaction: "October 2024",
      status: "payment_complete",
      aiReason: "99% payment completed for first order",
      assignedTo: "Abhishek Kumar",
      buyers: ["Rice Exporters Ltd", "Local Traders"],
      onboardedDate: "June 2024",
      priority: "medium"
    },
    {
      id: 4,
      name: "Prakash Singh",
      location: "Meerut, Uttar Pradesh",
      crop: "Wheat",
      lastTransaction: "June 2024",
      status: "priority",
      aiReason: "Similar buyers active, wheat season starting",
      assignedTo: "Surbhi Sharma",
      buyers: ["Flour Mills Co"],
      onboardedDate: "March 2024",
      priority: "high"
    },
    {
      id: 5,
      name: "Ganesh Rao",
      location: "Belgaum, Karnataka",
      crop: "Sugarcane",
      lastTransaction: "August 2024",
      status: "pending_dispatch",
      aiReason: "PO ready, awaiting dispatch",
      assignedTo: "Divya Singh",
      buyers: ["Sugar Factory"],
      onboardedDate: "July 2024",
      priority: "medium"
    }
  ];

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "priority") return matchesSearch && supplier.priority === "high";
    if (filter === "assigned") return matchesSearch && supplier.assignedTo === "Surbhi Sharma";
    return matchesSearch;
  });

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") return <Badge variant="destructive">High Priority</Badge>;
    return <Badge variant="secondary">Medium</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      priority: { label: "To Contact", variant: "default" },
      pending_dispatch: { label: "Pending Dispatch", variant: "secondary" },
      payment_complete: { label: "Payment Complete", variant: "outline" }
    };
    const config = statusMap[status] || statusMap.priority;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <>
      <div className="space-y-4">
        {filteredSuppliers.map((supplier) => (
        <Card key={supplier.id} className="transition-all duration-300 hover:shadow-md border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl">{supplier.name}</CardTitle>
                  {getPriorityBadge(supplier.priority)}
                  {getStatusBadge(supplier.status)}
                </div>
                <CardDescription className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {supplier.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Sprout className="h-3 w-3" />
                    {supplier.crop}
                  </span>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate(`/supplier/${supplier.id}`)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedSupplier({ id: supplier.id, name: supplier.name });
                    setNotificationDialogOpen(true);
                  }}
                >
                  <Bell className="h-4 w-4 mr-1" />
                  Notify
                </Button>
                <Button size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-accent/50 rounded-md">
                <p className="text-sm font-medium text-accent-foreground mb-1">AI Insight:</p>
                <p className="text-sm text-foreground">{supplier.aiReason}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Transaction:</span>
                  <p className="font-medium">{supplier.lastTransaction}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Assigned To:</span>
                  <p className="font-medium">{supplier.assignedTo}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Key Buyers:</span>
                  <p className="font-medium">{supplier.buyers[0]}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Onboarded:</span>
                  <p className="font-medium">{supplier.onboardedDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        ))}
        {filteredSuppliers.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No suppliers found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {selectedSupplier && (
        <TriggerNotificationDialog
          open={notificationDialogOpen}
          onOpenChange={setNotificationDialogOpen}
          supplierName={selectedSupplier.name}
          supplierId={selectedSupplier.id}
        />
      )}
    </>
  );
};

export default SupplierList;