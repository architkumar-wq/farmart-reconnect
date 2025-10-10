import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import LeadsTable from "@/components/LeadsTable";
import AddSupplierDialog from "@/components/AddSupplierDialog";

const LeadsAssigned = () => {
  const navigate = useNavigate();
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: "Seasonal Reactivation", key: "seasonal" },
    { id: 2, name: "Pending Dispatch", key: "pending" },
    { id: 3, name: "Payment Complete", key: "payment" }
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        key: newCategoryName.toLowerCase().replace(/\s+/g, '_')
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  const removeCategory = (categoryId: number) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  // Mock data organized by AI criteria
  const seasonalLeads = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Nashik, Maharashtra",
      crop: "Maize",
      lastTransaction: "July 2024",
      poNumber: "PO-2024-1532",
      doNumber: "DO-2024-0445",
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
      poNumber: "PO-2024-1421",
      doNumber: "DO-2024-0334",
      reason: "Wheat season starting, similar buyers active",
      similarBuyers: ["Flour Mills Co"],
      assignedTo: "Surbhi Sharma",
      priority: "high"
    }
  ];

  const pendingLeads = [
    {
      id: 2,
      name: "Amit Patel",
      location: "Surat, Gujarat",
      crop: "Cotton",
      poNumber: "PO-2024-1533",
      doNumber: "DO-2024-0556",
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
      doNumber: "DO-2024-0598",
      createdDate: "October 2024",
      reason: "PO ready for 2 weeks, awaiting dispatch",
      assignedTo: "Divya Singh",
      priority: "medium"
    }
  ];

  const paymentLeads = [
    {
      id: 3,
      name: "Suresh Reddy",
      location: "Warangal, Telangana",
      crop: "Rice",
      poNumber: "PO-2024-1654",
      doNumber: "DO-2024-0667",
      paymentStatus: "99%",
      orderValue: "₹4.8L",
      lastDispatch: "October 2024",
      reason: "First order payment almost complete",
      assignedTo: "Abhishek Kumar",
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Leads by Criteria</h1>
              <p className="text-muted-foreground">AI-identified suppliers organized by reactivation criteria</p>
            </div>
          </div>
          <div className="flex gap-2">
            {showAddCategory ? (
              <div className="flex gap-2">
                <Input
                  placeholder="New category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                  className="w-[200px]"
                />
                <Button onClick={addCategory} size="sm">Add</Button>
                <Button onClick={() => setShowAddCategory(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAddCategory(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            )}
            <Button onClick={() => setAddSupplierOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryLeads = category.key === "seasonal" ? seasonalLeads :
                                 category.key === "pending" ? pendingLeads :
                                 category.key === "payment" ? paymentLeads : [];
            
            return (
              <div key={category.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>
                          {category.key === "seasonal" && "Suppliers who sold a crop 3+ months ago and the crop is now in season"}
                          {category.key === "pending" && "Suppliers who created first PO but haven't dispatched yet"}
                          {category.key === "payment" && "Suppliers with 99%+ payment complete for first dispatch"}
                          {!["seasonal", "pending", "payment"].includes(category.key) && "Custom category"}
                        </CardDescription>
                      </div>
                      {category.id > 3 && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeCategory(category.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      Total Leads: <span className="font-semibold text-foreground">{categoryLeads.length}</span>
                    </div>
                    {categoryLeads.length > 0 ? (
                      <LeadsTable leads={categoryLeads} category={category.key} />
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No leads in this category yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <AddSupplierDialog open={addSupplierOpen} onOpenChange={setAddSupplierOpen} />
    </div>
  );
};

export default LeadsAssigned;