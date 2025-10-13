import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SingleCardView from "@/components/SingleCardView";
import NotificationPanel from "@/components/NotificationPanel";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("calls");
  const [callStatusFilter, setCallStatusFilter] = useState("assigned");

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">FarmartApp CRM</h1>
            <p className="text-muted-foreground">Supplier Reactivation Dashboard</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/calls-tracking")}>
              <ListChecks className="mr-2 h-4 w-4" />
              Calls Tracking
            </Button>
            <Button variant="outline" onClick={() => navigate("/leads")}>
              <ListChecks className="mr-2 h-4 w-4" />
              Leads by Criteria
            </Button>
            <Button variant="outline" onClick={() => navigate("/cs-metrics")}>
              <ListChecks className="mr-2 h-4 w-4" />
              CS Metrics
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Supplier ID, Name, or Phone Number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={callStatusFilter} onValueChange={setCallStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Call Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assigned">Call Assigned</SelectItem>
                  <SelectItem value="done">Call Done</SelectItem>
                  <SelectItem value="not_picked">Not Picked Up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 bg-muted">
            <TabsTrigger value="calls">Calls Made</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="calls" className="space-y-4">
            <SingleCardView searchQuery={searchQuery} callStatusFilter={callStatusFilter} />
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