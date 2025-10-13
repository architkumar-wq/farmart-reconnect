import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Phone, TrendingUp, Brain, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CSMetrics = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Assigned Today",
      value: "24",
      description: "Leads assigned to team members today",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Calls Made",
      value: "18",
      description: "Total calls completed today",
      icon: Phone,
      color: "text-success"
    },
    {
      title: "Reactivated (Conversion)",
      value: "7",
      description: "Suppliers successfully reactivated",
      icon: TrendingUp,
      color: "text-warning"
    },
    {
      title: "AI Assigned Leads",
      value: "15",
      description: "Leads assigned by AI criteria",
      icon: Brain,
      color: "text-secondary"
    },
    {
      title: "Manually Added Leads",
      value: "9",
      description: "Leads added manually by team",
      icon: UserPlus,
      color: "text-accent-foreground"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">CS Metrics</h1>
            <p className="text-muted-foreground">Customer Success Performance Dashboard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-foreground">{metric.value}</p>
                  <CardDescription>{metric.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Daily performance summary and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-foreground">38.9%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Average Call Duration</p>
                  <p className="text-2xl font-bold text-foreground">4m 32s</p>
                </div>
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Active Leads</p>
                  <p className="text-2xl font-bold text-foreground">42</p>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CSMetrics;
