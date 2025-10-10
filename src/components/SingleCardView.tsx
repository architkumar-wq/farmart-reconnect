import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ExpandedSupplierCard from "./ExpandedSupplierCard";

interface SingleCardViewProps {
  searchQuery: string;
  callStatusFilter: string;
}

const SingleCardView = ({ searchQuery, callStatusFilter }: SingleCardViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [callStatuses, setCallStatuses] = useState<Record<number, string>>({});

  const mockSuppliers = [
    {
      id: 1,
      name: "Rajesh Kumar",
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
      doNumber: "DO-2024-0445",
      firstTransactionDate: "June 2023",
      totalVolume: "150 tons",
      priority: "high",
      aiSummary: "This supplier was onboarded in May 2023 and last supplied 25 tons of Maize in July 2024 to Farmart.",
      focusPoints: "Focus on large volume buying and competitive rates in the area."
    },
    {
      id: 2,
      name: "Amit Patel",
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
      doNumber: "DO-2024-0556",
      firstTransactionDate: "September 2024",
      totalVolume: "45 tons",
      priority: "high",
      aiSummary: "New supplier onboarded in August 2024, first PO pending dispatch.",
      focusPoints: "Ensure smooth first dispatch experience and build trust."
    },
    {
      id: 3,
      name: "Suresh Reddy",
      phone: "+91 98765 11122",
      location: "Warangal, Telangana",
      crop: "Rice",
      lastTransaction: "October 2024",
      status: "payment_complete",
      aiReason: "99% payment completed for first order",
      assignedTo: "Abhishek Kumar",
      buyers: ["Rice Exporters Ltd", "Local Traders"],
      onboardedDate: "June 2024",
      onboardedBy: "Abhishek Kumar (PA)",
      currentPO: "PO-2024-1654",
      doNumber: "DO-2024-0667",
      firstTransactionDate: "July 2024",
      totalVolume: "80 tons",
      priority: "medium",
      aiSummary: "Reliable supplier with consistent quality, first order payment almost complete.",
      focusPoints: "Discuss repeat orders and volume commitments for next season."
    },
    {
      id: 4,
      name: "Prakash Singh",
      phone: "+91 98765 22233",
      location: "Meerut, Uttar Pradesh",
      crop: "Wheat",
      lastTransaction: "June 2024",
      status: "priority",
      aiReason: "Similar buyers active, wheat season starting",
      assignedTo: "Surbhi Sharma",
      buyers: ["Flour Mills Co"],
      onboardedDate: "March 2024",
      onboardedBy: "Surbhi Sharma (PA)",
      currentPO: "PO-2024-1421",
      doNumber: "DO-2024-0334",
      firstTransactionDate: "April 2024",
      totalVolume: "120 tons",
      priority: "high",
      aiSummary: "Strong performer in wheat supply, good relationship with major mills.",
      focusPoints: "Capitalize on wheat season, discuss volume discounts."
    },
    {
      id: 5,
      name: "Ganesh Rao",
      phone: "+91 98765 33344",
      location: "Belgaum, Karnataka",
      crop: "Sugarcane",
      lastTransaction: "August 2024",
      status: "pending_dispatch",
      aiReason: "PO ready, awaiting dispatch",
      assignedTo: "Divya Singh",
      buyers: ["Sugar Factory"],
      onboardedDate: "July 2024",
      onboardedBy: "Divya Singh (PA)",
      currentPO: "PO-2024-1598",
      doNumber: "DO-2024-0598",
      firstTransactionDate: "August 2024",
      totalVolume: "60 tons",
      priority: "medium",
      aiSummary: "New supplier with pending first dispatch, good quality sugarcane.",
      focusPoints: "Follow up on dispatch timeline and quality standards."
    }
  ];

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.phone.includes(searchQuery);
    
    const matchesCallStatus = callStatusFilter === "all" || 
      (callStatuses[supplier.id] || "assigned") === callStatusFilter;
    
    return matchesSearch && matchesCallStatus;
  });

  const handleCallStatusChange = (supplierId: number, status: string) => {
    setCallStatuses(prev => ({ ...prev, [supplierId]: status }));
    moveToNextCard();
  };

  const handleNotesAdded = () => {
    moveToNextCard();
  };

  const moveToNextCard = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredSuppliers.length);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [searchQuery, callStatusFilter]);

  // Ensure currentIndex is valid when filteredSuppliers changes
  useEffect(() => {
    if (currentIndex >= filteredSuppliers.length && filteredSuppliers.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredSuppliers.length, currentIndex]);

  if (filteredSuppliers.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No suppliers found matching your criteria.</p>
        </CardContent>
      </Card>
    );
  }

  const currentSupplier = filteredSuppliers[currentIndex];

  // Safety check to prevent undefined access
  if (!currentSupplier) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading supplier data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${isAnimating ? 'animate-slide-out-right opacity-0' : 'animate-slide-in-right'}`}>
        <ExpandedSupplierCard
          key={currentSupplier.id}
          supplier={currentSupplier}
          callStatus={callStatuses[currentSupplier.id] || "assigned"}
          onCallStatusChange={(status) => handleCallStatusChange(currentSupplier.id, status)}
          onNotesAdded={handleNotesAdded}
        />
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Card {currentIndex + 1} of {filteredSuppliers.length}
      </div>
    </div>
  );
};

export default SingleCardView;
