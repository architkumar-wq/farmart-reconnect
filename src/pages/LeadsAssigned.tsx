import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, UserPlus, Clock, Package, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddSupplierDialog from "@/components/AddSupplierDialog";
import LeadCard from "@/components/LeadCard";

const LeadsAssigned = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock data organized by AI criteria
  const criteriaLeads = {
    seasonal: [
      {
        id: 1,
        name: "Rajesh Kumar",
        location: "Nashik, Maharashtra",
        crop: "Maize",
        lastTransaction: "July 2024",
        reason: "Sold 25 tons 3 months ago, Maize is in season",
        similarBuyers: ["Mahesh Edible", "Local Mills"],
        assignedTo: "Surbhi Sharma",
        priority: "high"
      },
      {
        id: 4,
        name: "Prakash Singh",
        location: "Meerut, Uttar Pradesh",
        crop: "Wheat",
        lastTransaction: "June 2024",
        reason: "Wheat season starting, similar buyers active",
        similarBuyers: ["Flour Mills Co"],
        assignedTo: "Surbhi Sharma",
        priority: "high"
      }
    ],
    pendingDispatch: [
      {
        id: 2,
        name: "Amit Patel",
        location: "Surat, Gujarat",
        crop: "Cotton",
        poNumber: "PO-2024-1533",
        createdDate: "September 2024",
        reason: "First PO created but dispatch pending",
        assignedTo: "Divya Singh",
        priority: "high"
      },
      {
        id: 5,
        name: "Ganesh Rao",
        location: "Belgaum, Karnataka",
        crop: "Sugarcane",
        poNumber: "PO-2024-1548",
        createdDate: "October 2024",
        reason: "PO ready for 2 weeks, awaiting dispatch",
        assignedTo: "Divya Singh",
        priority: "medium"
      }
    ],
    paymentComplete: [
      {
        id: 3,
        name: "Suresh Reddy",
        location: "Warangal, Telangana",
        crop: "Rice",
        paymentStatus: "99%",
        orderValue: "₹4.8L",
        lastDispatch: "October 2024",
        reason: "First order payment almost complete",
        assignedTo: "Abhishek Kumar",
        priority: "medium"
      }
    ]
  };

  const getAllLeads = () => {
    return [
      ...criteriaLeads.seasonal,
      ...criteriaLeads.pendingDispatch,
      ...criteriaLeads.paymentComplete
    ];
  };

  const getLeadsByCategory = (category: string) => {
    switch (category) {
      case "seasonal":
        return criteriaLeads.seasonal;
      case "pending":
        return criteriaLeads.pendingDispatch;
      case "payment":
        return criteriaLeads.paymentComplete;
      default:
        return getAllLeads();
    }
  };

  const currentLeads = getLeadsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Leads Assigned</h1>
              <p className="text-muted-foreground">AI-identified suppliers by criteria</p>
            </div>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier Manually
          </Button>
        </div>

        {/* Criteria Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-success">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Seasonal Reactivation</CardTitle>
                <Clock className="h-5 w-5 text-success" />
              </div>
              <CardDescription className="text-xs">
                Sold 3+ months ago, crop in season
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {criteriaLeads.seasonal.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">suppliers identified</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pending Dispatch</CardTitle>
                <Package className="h-5 w-5 text-warning" />
              </div>
              <CardDescription className="text-xs">
                First PO created, not dispatched
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {criteriaLeads.pendingDispatch.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">suppliers identified</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Payment Complete</CardTitle>
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <CardDescription className="text-xs">
                {"99%+ payment for first order"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {criteriaLeads.paymentComplete.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">suppliers identified</p>
            </CardContent>
          </Card>
        </div>

        {/* Categorized Leads */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 bg-muted">
            <TabsTrigger value="all">
              All ({getAllLeads().length})
            </TabsTrigger>
            <TabsTrigger value="seasonal">
              Seasonal ({criteriaLeads.seasonal.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending Dispatch ({criteriaLeads.pendingDispatch.length})
            </TabsTrigger>
            <TabsTrigger value="payment">
              Payment ({criteriaLeads.paymentComplete.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeCategory === "seasonal" && "Seasonal Reactivation Leads"}
                  {activeCategory === "pending" && "Pending Dispatch Leads"}
                  {activeCategory === "payment" && "Payment Complete Leads"}
                  {activeCategory === "all" && "All Leads"}
                </CardTitle>
                <CardDescription>
                  {activeCategory === "seasonal" && "Suppliers who sold 3+ months ago and crop is in season"}
                  {activeCategory === "pending" && "Suppliers with first PO created but not dispatched"}
                  {activeCategory === "payment" && "Suppliers with 99%+ payment completed"}
                  {activeCategory === "all" && "All AI-identified supplier leads"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentLeads.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No leads found in this category
                  </div>
                ) : (
                  currentLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      category={activeCategory === "all" ? 
                        (criteriaLeads.seasonal.find(l => l.id === lead.id) ? "seasonal" :
                         criteriaLeads.pendingDispatch.find(l => l.id === lead.id) ? "pending" : "payment") 
                        : activeCategory}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddSupplierDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
};

export default LeadsAssigned;