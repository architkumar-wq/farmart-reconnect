import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Search, Filter, Bell, TrendingUp, Users, Calendar, ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SupplierList from "@/components/SupplierList";
import StatsCards from "@/components/StatsCards";
import NotificationPanel from "@/components/NotificationPanel";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">FarmartApp CRM</h1>
            <p className="text-muted-foreground">Supplier Reactivation Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="outline" onClick={() => navigate("/leads")}>
              <ListChecks className="mr-2 h-4 w-4" />
              Leads by Criteria
            </Button>
            <Button className="bg-primary hover:bg-primary-hover">
              <Phone className="mr-2 h-4 w-4" />
              Start Calling
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers by name, crop, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-4 bg-muted">
            <TabsTrigger value="all">All Suppliers</TabsTrigger>
            <TabsTrigger value="priority">
              Priority
              <Badge variant="destructive" className="ml-2">12</Badge>
            </TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <SupplierList searchQuery={searchQuery} filter="all" />
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            <SupplierList searchQuery={searchQuery} filter="priority" />
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4">
            <SupplierList searchQuery={searchQuery} filter="assigned" />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;