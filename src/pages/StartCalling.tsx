import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, CheckCircle, XCircle, Clock, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CallSupplierCard from "@/components/CallSupplierCard";

const StartCalling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedCalls, setCompletedCalls] = useState<number[]>([]);

  const today = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Mock daily assigned suppliers
  const dailyAssignments = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      location: "Nashik, Maharashtra",
      crop: "Maize",
      priority: "high",
      reason: "Seasonal reactivation - Maize in season",
      lastContact: "3 months ago",
      assignedTime: "09:00 AM",
      status: "pending"
    },
    {
      id: 2,
      name: "Amit Patel",
      phone: "+91 98765 43211",
      location: "Surat, Gujarat",
      crop: "Cotton",
      priority: "high",
      reason: "Pending dispatch - Follow up on PO",
      lastContact: "2 weeks ago",
      assignedTime: "09:30 AM",
      status: "pending"
    },
    {
      id: 3,
      name: "Suresh Reddy",
      phone: "+91 98765 43212",
      location: "Warangal, Telangana",
      crop: "Rice",
      priority: "medium",
      reason: "Payment complete - Ready for next order",
      lastContact: "1 month ago",
      assignedTime: "10:00 AM",
      status: "pending"
    },
    {
      id: 4,
      name: "Prakash Singh",
      phone: "+91 98765 43213",
      location: "Meerut, Uttar Pradesh",
      crop: "Wheat",
      priority: "high",
      reason: "Wheat season starting - Similar buyers active",
      lastContact: "4 months ago",
      assignedTime: "10:30 AM",
      status: "pending"
    },
    {
      id: 5,
      name: "Ganesh Rao",
      phone: "+91 98765 43214",
      location: "Belgaum, Karnataka",
      crop: "Sugarcane",
      priority: "medium",
      reason: "Pending dispatch - 2 weeks overdue",
      lastContact: "1 week ago",
      assignedTime: "11:00 AM",
      status: "pending"
    }
  ];

  const pendingCalls = dailyAssignments.filter(s => !completedCalls.includes(s.id));
  const completedCount = completedCalls.length;
  const totalCount = dailyAssignments.length;

  const handleCallComplete = (supplierId: number, outcome: "success" | "failed" | "callback") => {
    setCompletedCalls([...completedCalls, supplierId]);
    
    const outcomeMessages = {
      success: "Call completed successfully",
      failed: "Call marked as failed",
      callback: "Callback scheduled"
    };

    toast({
      title: outcomeMessages[outcome],
      description: `Supplier call logged. ${pendingCalls.length - 1} calls remaining.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-1">Daily Call List</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {today}
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Total Assigned</span>
                <User className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCount}</div>
              <p className="text-xs text-muted-foreground mt-1">suppliers today</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Completed</span>
                <CheckCircle className="h-5 w-5 text-success" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">calls made</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Pending</span>
                <Clock className="h-5 w-5 text-warning" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingCalls.length}</div>
              <p className="text-xs text-muted-foreground mt-1">remaining</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent-foreground">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">completion rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Call List */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Call Schedule</CardTitle>
            <CardDescription>
              Suppliers assigned for contact today - sorted by priority and time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingCalls.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  All Calls Completed!
                </h3>
                <p className="text-muted-foreground">
                  Great work! You've completed all assigned calls for today.
                </p>
              </div>
            ) : (
              pendingCalls.map((supplier) => (
                <CallSupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  onCallComplete={handleCallComplete}
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Completed Calls */}
        {completedCount > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Completed Calls ({completedCount})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dailyAssignments
                  .filter(s => completedCalls.includes(s.id))
                  .map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <p className="text-sm text-muted-foreground">{supplier.location}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-success border-success">
                        Called
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StartCalling;