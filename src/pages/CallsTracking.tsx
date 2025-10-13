import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const CallsTracking = () => {
  const navigate = useNavigate();
  const [callStatuses, setCallStatuses] = useState<Record<number, string>>({});
  const [notesDialogs, setNotesDialogs] = useState<Record<number, boolean>>({});
  const [callNotes, setCallNotes] = useState<Record<number, string>>({});

  const mockCallRecords = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      location: "Nashik, Maharashtra",
      crop: "Maize",
      assignedTo: "Surbhi Sharma",
      currentPO: "PO-2024-1532",
      doNumber: "DO-2024-0445",
      callStatus: "done",
      priority: "high",
      lastCalled: "2024-10-10"
    },
    {
      id: 2,
      name: "Amit Patel",
      phone: "+91 99887 76655",
      location: "Surat, Gujarat",
      crop: "Cotton",
      assignedTo: "Divya Singh",
      currentPO: "PO-2024-1789",
      doNumber: "DO-2024-0556",
      callStatus: "not_picked",
      priority: "high",
      lastCalled: "2024-10-10"
    },
    {
      id: 3,
      name: "Suresh Reddy",
      phone: "+91 98765 11122",
      location: "Warangal, Telangana",
      crop: "Rice",
      assignedTo: "Abhishek Kumar",
      currentPO: "PO-2024-1654",
      doNumber: "DO-2024-0667",
      callStatus: "assigned",
      priority: "medium",
      lastCalled: "2024-10-09"
    },
    {
      id: 4,
      name: "Prakash Singh",
      phone: "+91 98765 22233",
      location: "Meerut, Uttar Pradesh",
      crop: "Wheat",
      assignedTo: "Surbhi Sharma",
      currentPO: "PO-2024-1421",
      doNumber: "DO-2024-0334",
      callStatus: "done",
      priority: "high",
      lastCalled: "2024-10-10"
    },
    {
      id: 5,
      name: "Ganesh Rao",
      phone: "+91 98765 33344",
      location: "Belgaum, Karnataka",
      crop: "Sugarcane",
      assignedTo: "Divya Singh",
      currentPO: "PO-2024-1598",
      doNumber: "DO-2024-0598",
      callStatus: "assigned",
      priority: "medium",
      lastCalled: "2024-10-09"
    }
  ];

  const handleCallStatusChange = (id: number, status: string) => {
    setCallStatuses(prev => ({ ...prev, [id]: status }));
  };

  const handleNotesDialogChange = (id: number, open: boolean) => {
    setNotesDialogs(prev => ({ ...prev, [id]: open }));
  };

  const saveNotes = (id: number) => {
    console.log("Saving notes for supplier", id, ":", callNotes[id]);
    handleNotesDialogChange(id, false);
  };

  const getCallStatusBadge = (status: string) => {
    switch (status) {
      case "done":
        return <Badge className="bg-success text-success-foreground">Call Done</Badge>;
      case "not_picked":
        return <Badge variant="destructive">Not Picked Up</Badge>;
      default:
        return <Badge variant="default">Call Assigned</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") return <Badge variant="destructive">High</Badge>;
    return <Badge variant="secondary">Medium</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calls Tracking</h1>
            <p className="text-muted-foreground">Track and manage all supplier calls</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Call Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>PO/DO Number</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Call Status</TableHead>
                    <TableHead>Last Called</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCallRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell className="text-sm">{record.phone}</TableCell>
                      <TableCell className="text-sm">{record.location}</TableCell>
                      <TableCell className="text-sm">{record.crop}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {record.currentPO}
                        {record.doNumber && <div>{record.doNumber}</div>}
                      </TableCell>
                      <TableCell className="text-sm">{record.assignedTo}</TableCell>
                      <TableCell>
                        <Select
                          value={callStatuses[record.id] || record.callStatus}
                          onValueChange={(value) => handleCallStatusChange(record.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assigned">Call Assigned</SelectItem>
                            <SelectItem value="done">Call Done</SelectItem>
                            <SelectItem value="not_picked">Not Picked Up</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm">{record.lastCalled}</TableCell>
                      <TableCell>
                        <Dialog
                          open={notesDialogs[record.id] || false}
                          onOpenChange={(open) => handleNotesDialogChange(record.id, open)}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Add Notes
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Call Notes</DialogTitle>
                              <DialogDescription>
                                Enter custom remarks or details about the call with {record.name}
                              </DialogDescription>
                            </DialogHeader>
                            <Textarea
                              placeholder="Enter your notes here..."
                              value={callNotes[record.id] || ""}
                              onChange={(e) =>
                                setCallNotes(prev => ({ ...prev, [record.id]: e.target.value }))
                              }
                              rows={5}
                            />
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => handleNotesDialogChange(record.id, false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={() => saveNotes(record.id)}>Save Notes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallsTracking;
