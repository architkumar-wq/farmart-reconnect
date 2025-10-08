import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "First PO Booked",
      message: "Rajesh Kumar has booked his first PO worth ₹5.2L for Maize",
      recipient: "PA: Abhishek Kumar, State Head: Priya Mehta",
      time: "2 hours ago",
      icon: CheckCircle
    },
    {
      id: 2,
      type: "alert",
      title: "Supplier Reactivated",
      message: "Amit Patel can be activated - last spoke 3 days ago, interested in new rates",
      recipient: "PA: Divya Singh",
      time: "5 hours ago",
      icon: AlertCircle
    },
    {
      id: 3,
      type: "info",
      title: "Payment Completed",
      message: "Suresh Reddy - 99% payment completed for first dispatch order",
      recipient: "Reporting Manager: Rohit Sharma",
      time: "1 day ago",
      icon: Info
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-success";
      case "alert":
        return "text-warning";
      case "info":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge className="bg-success text-success-foreground">Success</Badge>;
      case "alert":
        return <Badge className="bg-warning text-warning-foreground">Action Needed</Badge>;
      case "info":
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge>Notification</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Trigger-Based Notifications
          </CardTitle>
          <CardDescription>
            Automated alerts sent to relevant stakeholders
          </CardDescription>
        </CardHeader>
      </Card>

      {notifications.map((notification) => (
        <Card key={notification.id} className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <notification.icon className={`h-5 w-5 mt-1 ${getTypeColor(notification.type)}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    {getTypeBadge(notification.type)}
                  </div>
                  <CardDescription className="text-sm">
                    {notification.message}
                  </CardDescription>
                  <div className="mt-3 p-2 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Sent to:</span> {notification.recipient}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {notification.time}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationPanel;