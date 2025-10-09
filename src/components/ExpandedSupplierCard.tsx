import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Eye, MapPin, Sprout, Bell, User, Calendar, Package, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TriggerNotificationDialog from "./TriggerNotificationDialog";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ExpandedSupplierCardProps {
  supplier: any;
  callStatus: string;
  onCallStatusChange: (status: string) => void;
}

const ExpandedSupplierCard = ({ supplier, callStatus, onCallStatusChange }: ExpandedSupplierCardProps) => {
  const navigate = useNavigate();
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [aiSummaryOpen, setAiSummaryOpen] = useState(false);
  const [focusPointsOpen, setFocusPointsOpen] = useState(false);
  const [callNotes, setCallNotes] = useState("");
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") return <Badge variant="destructive">High Priority</Badge>;
    return <Badge variant="secondary">Medium</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      priority: { label: "To Contact", variant: "default" },
      pending_dispatch: { label: "Pending Dispatch", variant: "secondary" },
      payment_complete: { label: "Payment Complete", variant: "outline" }
    };
    const config = statusMap[status] || statusMap.priority;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCallStatusColor = (status: string) => {
    switch (status) {
      case "done": return "bg-success text-success-foreground";
      case "not_picked": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const saveNotes = () => {
    console.log("Saving notes:", callNotes);
    setNotesDialogOpen(false);
  };

  return (
    <>
      <Card className="transition-all duration-300 hover:shadow-md border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-xl font-semibold">{supplier.name}</h3>
                {getPriorityBadge(supplier.priority)}
                {getStatusBadge(supplier.status)}
                <Badge variant="outline" className="font-mono text-xs">{supplier.supplierId}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {supplier.location}
                </span>
                <span className="flex items-center gap-1">
                  <Sprout className="h-3 w-3" />
                  {supplier.crop}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {supplier.phone}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Select value={callStatus} onValueChange={onCallStatusChange}>
                <SelectTrigger className={`w-[160px] ${getCallStatusColor(callStatus)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assigned">Call Assigned</SelectItem>
                  <SelectItem value="done">Call Done</SelectItem>
                  <SelectItem value="not_picked">Not Picked Up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Summary Collapsible */}
          <Collapsible open={aiSummaryOpen} onOpenChange={setAiSummaryOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="p-3 bg-primary/10 rounded-md flex justify-between items-center cursor-pointer hover:bg-primary/20 transition-colors">
                <p className="text-sm font-medium">AI-Generated Engagement Summary</p>
                {aiSummaryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="p-3 bg-accent/30 rounded-md">
                <p className="text-sm">{supplier.aiSummary}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm p-3 bg-muted/50 rounded-md">
            <div>
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Onboarded:
              </span>
              <p className="font-medium">{supplier.onboardedDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                Onboarded By:
              </span>
              <p className="font-medium text-xs">{supplier.onboardedBy}</p>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1">
                <Package className="h-3 w-3" />
                Current PO:
              </span>
              <p className="font-medium font-mono text-xs">{supplier.currentPO}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Transaction:</span>
              <p className="font-medium">{supplier.lastTransaction}</p>
            </div>
            <div>
              <span className="text-muted-foreground">First Transaction:</span>
              <p className="font-medium">{supplier.firstTransactionDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Volume:</span>
              <p className="font-medium">{supplier.totalVolume}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Assigned To:</span>
              <p className="font-medium">{supplier.assignedTo}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Key Buyers:</span>
              <p className="font-medium text-xs">{supplier.buyers[0]}</p>
            </div>
          </div>

          {/* Call Focus Points Collapsible */}
          <Collapsible open={focusPointsOpen} onOpenChange={setFocusPointsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="p-3 bg-success/10 rounded-md flex justify-between items-center cursor-pointer hover:bg-success/20 transition-colors">
                <p className="text-sm font-medium">Call Focus Points</p>
                {focusPointsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="p-3 bg-accent/30 rounded-md space-y-2">
                <p className="text-sm">{supplier.focusPoints}</p>
                <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="w-full">
                      Add Call Notes
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Call Notes</DialogTitle>
                      <DialogDescription>
                        Enter custom remarks or details about the call with {supplier.name}
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="Enter your notes here..."
                      value={callNotes}
                      onChange={(e) => setCallNotes(e.target.value)}
                      rows={5}
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={saveNotes}>Save Notes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/supplier/${supplier.id}`)}
              className="flex-1 min-w-[140px]"
            >
              <Eye className="h-4 w-4 mr-1" />
              View More Details
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setNotificationDialogOpen(true)}
              className="flex-1 min-w-[100px]"
            >
              <Bell className="h-4 w-4 mr-1" />
              Notify
            </Button>
            <Button size="sm" className="flex-1 min-w-[100px]">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>

      <TriggerNotificationDialog
        open={notificationDialogOpen}
        onOpenChange={setNotificationDialogOpen}
        supplierName={supplier.name}
        supplierId={supplier.id}
      />
    </>
  );
};

export default ExpandedSupplierCard;
