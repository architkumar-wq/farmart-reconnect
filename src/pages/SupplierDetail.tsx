import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Phone, User, MapPin, Calendar, TrendingUp, Package, MessageCircle, Bell } from "lucide-react";
import TriggerNotificationDialog from "@/components/TriggerNotificationDialog";

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);

  // Mock data - in real app this would be fetched based on ID
  const supplier = {
    id: 1,
    name: "Rajesh Kumar",
    location: "Nashik, Maharashtra",
    phone: "+91 98765 43210",
    onboardedDate: "May 2023",
    onboardedBy: "Surbhi Sharma (PA)",
    currentPO: "PO-2024-1532",
    firstTransactionDate: "June 2023",
    lastTransactionDate: "July 2024",
    totalTransactions: 12,
    totalVolume: "150 tons",
    registeredOnApp: true,
    onAppSince: "June 2023",
    onOSSince: "May 2023",
    totalBusinessDone: "₹42.5L",
    totalVolumeDone: "150 tonnes",
    gtvPOs: 8,
    gmvPOs: 4,
    aiSummary: "This supplier was onboarded in May 2023 and last supplied 25 tons of Maize in July 2024 to Farmart and primarily sold this to Mahesh Edible. Most of the orders were GMV and handled by PA - Abhishek.",
    pastConversations: [
      {
        date: "November 15, 2024",
        summary: "The last time Surbhi has spoken to this supplier and he was not very happy with the rates offered by Farmart. He also shared that his payments were delayed. Overall he agreed to be in contact but was not sure of working with Farmart as he is working with local financiers / brokers."
      },
      {
        date: "October 8, 2024",
        summary: "Initial follow-up call. Supplier expressed interest in continuing relationship but was concerned about payment timelines. Discussed upcoming harvest season and potential volumes."
      }
    ],
    buyerPrice: "₹28,500 per ton",
    focusPoints: "Focus on the fact that we are doing large volume buying in this area and supplying to multiple local and regional buyers are similar and higher prices that he sold last year. Also mention that now he can view all ledgers and order information in FarmartApp, which no other local broker / financier shows since he has still not seen the app.",
    keyBuyers: ["Mahesh Edible", "Local Mills", "Gujarat Traders"],
    cropTransactions: [
      { crop: "Maize", quantity: "100 tons", transactions: 8, lastDate: "July 2024" },
      { crop: "Wheat", quantity: "35 tons", transactions: 3, lastDate: "March 2024" },
      { crop: "Soybean", quantity: "15 tons", transactions: 1, lastDate: "January 2024" }
    ]
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
            <h1 className="text-3xl font-bold text-foreground">{supplier.name}</h1>
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" />
              {supplier.location}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setNotificationDialogOpen(true)}>
              <Bell className="h-4 w-4 mr-2" />
              Notify Supplier
            </Button>
            <Button onClick={() => setCallDialogOpen(true)}>
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>

        {/* AI Summaries */}
        <div className="grid gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                AI-Generated Engagement Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{supplier.aiSummary}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-secondary" />
                Past Conversation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supplier.pastConversations.map((conversation: any, idx: number) => (
                <div key={idx} className={`${idx > 0 ? 'pt-4 border-t border-border' : ''}`}>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {conversation.date}
                  </p>
                  <p className="text-foreground leading-relaxed">{conversation.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success bg-success/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-success" />
                Call Focus Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed font-medium">{supplier.focusPoints}</p>
            </CardContent>
          </Card>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Supplier Overview</CardTitle>
            <CardDescription>Key information and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Registered on App</p>
                <p className="font-semibold">{supplier.registeredOnApp ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">On App Since</p>
                <p className="font-semibold">{supplier.onAppSince}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">On OS Since</p>
                <p className="font-semibold">{supplier.onOSSince}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Business Done</p>
                <p className="font-semibold text-success">{supplier.totalBusinessDone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Volume Done</p>
                <p className="font-semibold">{supplier.totalVolumeDone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">GTV PO's</p>
                <p className="font-semibold">{supplier.gtvPOs}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">GMV PO's</p>
                <p className="font-semibold">{supplier.gmvPOs}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Onboarded On</p>
                <p className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {supplier.onboardedDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Onboarded By</p>
                <p className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  {supplier.onboardedBy}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current PO</p>
                <Badge variant="outline" className="font-mono">{supplier.currentPO}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">First Transaction</p>
                <p className="font-semibold">{supplier.firstTransactionDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Transaction</p>
                <p className="font-semibold">{supplier.lastTransactionDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Volume</p>
                <p className="font-semibold">{supplier.totalVolume}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Buyer Price</p>
                <p className="font-semibold text-success">{supplier.buyerPrice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <p className="font-semibold">{supplier.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
                <p className="font-semibold">{supplier.totalTransactions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Key Buyers</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.keyBuyers.map((buyer, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {buyer}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop-wise Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Crop-wise Transaction History</CardTitle>
            <CardDescription>Detailed breakdown by commodity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Total Quantity</TableHead>
                  <TableHead>Number of Transactions</TableHead>
                  <TableHead>Last Transaction Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplier.cropTransactions.map((transaction, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{transaction.crop}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.transactions}</TableCell>
                    <TableCell>{transaction.lastDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Call Overlay Dialog */}
        <Dialog open={callDialogOpen} onOpenChange={setCallDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Call {supplier.name}</DialogTitle>
              <DialogDescription>
                Click the number below to initiate a call
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 text-center">
              <a 
                href={`tel:${supplier.phone}`}
                className="text-3xl font-bold text-primary hover:underline"
              >
                {supplier.phone}
              </a>
            </div>
          </DialogContent>
        </Dialog>

        {/* Notification Dialog */}
        <TriggerNotificationDialog
          open={notificationDialogOpen}
          onOpenChange={setNotificationDialogOpen}
          supplierName={supplier.name}
          supplierId={Number(id)}
        />
      </div>
    </div>
  );
};

export default SupplierDetail;