import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ExpandedSupplierCard from "./ExpandedSupplierCard";

interface SupplierListProps {
  searchQuery: string;
  filter: string;
  callStatusFilter?: string;
}

const SupplierList = ({ searchQuery, filter, callStatusFilter = "all" }: SupplierListProps) => {
  const [callStatuses, setCallStatuses] = useState<Record<number, string>>({});

  const mockSuppliers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      supplierId: "SUP-2023-001",
      phone: "+91 98765 43210",
      location: "Nashik, Maharashtra",
      crop: "Maize",
      lastTransaction: "July 2024",
      status: "priority",
      aiReason: "Sold 25 tons 3 months ago, crop in season",
      assignedTo: "Surbhi Sharma",
      buyers: ["Mahesh Edible", "Local Mills"],
      onboardedDate: "May 2023",
      onboardedBy: "Abhishek Kumar (PA)",
      currentPO: "PO-2024-1532",
      firstTransactionDate: "June 2023",
      totalVolume: "150 tons",
      priority: "high",
      aiSummary: "This supplier was onboarded in May 2023 and last supplied 25 tons of Maize in July 2024 to Farmart.",
      focusPoints: "Focus on large volume buying and competitive rates in the area."
    },
    {
      id: 2,
      name: "Amit Patel",
      supplierId: "SUP-2024-089",
      phone: "+91 99887 76655",
      location: "Surat, Gujarat",
      crop: "Cotton",
      lastTransaction: "September 2024",
      status: "pending_dispatch",
      aiReason: "First PO created but not dispatched",
      assignedTo: "Divya Singh",
      buyers: ["Gujarat Textiles"],
      onboardedDate: "August 2024",
      onboardedBy: "Divya Singh (PA)",
      currentPO: "PO-2024-1789",
      firstTransactionDate: "September 2024",
      totalVolume: "45 tons",
      priority: "high",
      aiSummary: "New supplier onboarded in August 2024, first PO pending dispatch.",
      focusPoints: "Ensure smooth first dispatch experience and build trust."
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

  const handleCallStatusChange = (supplierId: number, status: string) => {
    setCallStatuses(prev => ({ ...prev, [supplierId]: status }));
  };

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (supplier.supplierId && supplier.supplierId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (supplier.phone && supplier.phone.includes(searchQuery));
    
    const matchesCallStatus = callStatusFilter === "all" || 
      (callStatuses[supplier.id] || "assigned") === callStatusFilter;
    
    if (filter === "priority") return matchesSearch && matchesCallStatus && supplier.priority === "high";
    if (filter === "assigned") return matchesSearch && matchesCallStatus && supplier.assignedTo === "Surbhi Sharma";
    return matchesSearch && matchesCallStatus;
  });

  return (
    <div className="space-y-4">
      {filteredSuppliers.map((supplier) => (
        <ExpandedSupplierCard
          key={supplier.id}
          supplier={supplier}
          callStatus={callStatuses[supplier.id] || "assigned"}
          onCallStatusChange={(status) => handleCallStatusChange(supplier.id, status)}
        />
      ))}
      {filteredSuppliers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No suppliers found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupplierList;