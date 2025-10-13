import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

const NotificationPanel = () => {
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "First PO Booked",
      message: "Rajesh Kumar has booked his first PO worth ₹5.2L for Maize",
      recipient: "PA: Abhishek Kumar, State Head: Priya Mehta",
      time: "2 hours ago",
      icon: CheckCircle,
      fullMessage: "Dear Abhishek Kumar,\n\nGreat news! Rajesh Kumar has successfully booked his first PO worth ₹5.2L for Maize. This is a significant milestone in our partnership.\n\nPO Details:\n- Amount: ₹5.2L\n- Commodity: Maize\n- Supplier: Rajesh Kumar\n\nPlease follow up with the supplier to ensure smooth processing.\n\nBest regards,\nFarmartApp CRM"
    },
    {
      id: 2,
      type: "alert",
      title: "Supplier Reactivated",
      message: "Amit Patel can be activated - last spoke 3 days ago, interested in new rates",
      recipient: "PA: Divya Singh",
      time: "5 hours ago",
      icon: AlertCircle,
      fullMessage: "Dear Divya Singh,\n\nAmit Patel is ready for reactivation. Based on our last conversation 3 days ago, he showed strong interest in our new rates.\n\nKey Points:\n- Last contact: 3 days ago\n- Status: Interested in new rates\n- Action needed: Follow up with updated pricing\n\nPlease reach out at your earliest convenience to close the deal.\n\nBest regards,\nFarmartApp CRM"
    },
    {
      id: 3,
      type: "info",
      title: "Payment Completed",
      message: "Suresh Reddy - 99% payment completed for first dispatch order",
      recipient: "Reporting Manager: Rohit Sharma",
      time: "1 day ago",
      icon: Info,
      fullMessage: "Dear Rohit Sharma,\n\nPayment update for Suresh Reddy:\n\nWe're pleased to inform you that 99% of the payment for the first dispatch order has been completed.\n\nPayment Details:\n- Supplier: Suresh Reddy\n- Order: First dispatch\n- Completion: 99%\n- Remaining: ₹500 (approx)\n\nThis demonstrates excellent payment processing. Please monitor for final settlement.\n\nBest regards,\nFarmartApp CRM"
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedNotification(notification)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Message Details Dialog */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedNotification?.title}</DialogTitle>
            <DialogDescription>
              Full notification message sent to {selectedNotification?.recipient}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
              {selectedNotification?.fullMessage}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationPanel;