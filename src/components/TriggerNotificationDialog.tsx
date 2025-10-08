import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell, User, UserCog, Users } from "lucide-react";

interface TriggerNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierName: string;
  supplierId: number;
}

const TriggerNotificationDialog = ({ open, onOpenChange, supplierName, supplierId }: TriggerNotificationDialogProps) => {
  const { toast } = useToast();
  const [notificationType, setNotificationType] = useState("");
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState({
    pa: false,
    reportingManager: false,
    stateHead: false
  });

  const handleSendNotification = () => {
    const selectedRecipients = Object.entries(recipients)
      .filter(([_, isSelected]) => isSelected)
      .map(([role]) => role);

    if (selectedRecipients.length === 0) {
      toast({
        title: "No Recipients Selected",
        description: "Please select at least one recipient",
        variant: "destructive"
      });
      return;
    }

    if (!notificationType || !message) {
      toast({
        title: "Missing Information",
        description: "Please select notification type and add a message",
        variant: "destructive"
      });
      return;
    }

    // Here you would send the notification to the backend
    console.log("Sending notification:", {
      supplierId,
      supplierName,
      type: notificationType,
      message,
      recipients: selectedRecipients
    });

    toast({
      title: "Notification Sent",
      description: `Notification sent to ${selectedRecipients.length} recipient(s)`,
    });

    // Reset form
    setNotificationType("");
    setMessage("");
    setRecipients({ pa: false, reportingManager: false, stateHead: false });
    onOpenChange(false);
  };

  const notificationTemplates = {
    reactivation: `Supplier ${supplierName} can be reactivated. Last conversation was positive. Ready for follow-up.`,
    firstPO: `${supplierName} has booked their first PO. Please follow up to ensure smooth dispatch.`,
    paymentComplete: `${supplierName}'s payment has been completed. Good opportunity for next order discussion.`,
    callback: `Callback scheduled with ${supplierName}. Please ensure timely follow-up.`,
    custom: ""
  };

  const handleTypeChange = (value: string) => {
    setNotificationType(value);
    setMessage(notificationTemplates[value as keyof typeof notificationTemplates] || "");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Trigger Notification
          </DialogTitle>
          <DialogDescription>
            Send notification to stakeholders about {supplierName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notification Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Notification Type</Label>
            <Select value={notificationType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select notification type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reactivation">Supplier Reactivation</SelectItem>
                <SelectItem value="firstPO">First PO Booked</SelectItem>
                <SelectItem value="paymentComplete">Payment Complete</SelectItem>
                <SelectItem value="callback">Callback Required</SelectItem>
                <SelectItem value="custom">Custom Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Recipients */}
          <div className="space-y-3">
            <Label>Recipients</Label>
            <div className="space-y-3 p-4 bg-muted/50 rounded-md">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="pa"
                  checked={recipients.pa}
                  onCheckedChange={(checked) => 
                    setRecipients({ ...recipients, pa: checked as boolean })
                  }
                />
                <label htmlFor="pa" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <User className="h-4 w-4 text-primary" />
                  Onboarded By (PA)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="manager"
                  checked={recipients.reportingManager}
                  onCheckedChange={(checked) => 
                    setRecipients({ ...recipients, reportingManager: checked as boolean })
                  }
                />
                <label htmlFor="manager" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <UserCog className="h-4 w-4 text-primary" />
                  Reporting Manager
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="stateHead"
                  checked={recipients.stateHead}
                  onCheckedChange={(checked) => 
                    setRecipients({ ...recipients, stateHead: checked as boolean })
                  }
                />
                <label htmlFor="stateHead" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <Users className="h-4 w-4 text-primary" />
                  State Head
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSendNotification}>
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TriggerNotificationDialog;