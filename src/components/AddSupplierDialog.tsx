import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddSupplierDialog = ({ open, onOpenChange }: AddSupplierDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    supplierNumber: "",
    supplierId: "",
    category: "",
    assignTo: "",
    additionalNotes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.supplierNumber || !formData.supplierId || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in Supplier Number, Supplier ID, and Category",
        variant: "destructive"
      });
      return;
    }

    console.log("Saving supplier:", formData);
    
    toast({
      title: "Supplier Added",
      description: `Supplier ${formData.supplierId} has been added successfully`,
    });

    setFormData({
      supplierNumber: "",
      supplierId: "",
      category: "",
      assignTo: "",
      additionalNotes: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Supplier Manually</DialogTitle>
          <DialogDescription>
            Enter supplier details and assign to appropriate category
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplierNumber">Supplier Number *</Label>
              <Input
                id="supplierNumber"
                placeholder="Enter supplier phone number"
                value={formData.supplierNumber}
                onChange={(e) => setFormData({ ...formData, supplierNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierId">Supplier ID *</Label>
              <Input
                id="supplierId"
                placeholder="e.g., SUP-2024-001"
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seasonal">Seasonal Reactivation</SelectItem>
                  <SelectItem value="pending">Pending Dispatch</SelectItem>
                  <SelectItem value="payment">Payment Complete</SelectItem>
                  <SelectItem value="new">New Supplier</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignTo">Assign To Agent</Label>
              <Select value={formData.assignTo} onValueChange={(value) => setFormData({ ...formData, assignTo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surbhi">Surbhi Sharma</SelectItem>
                  <SelectItem value="divya">Divya Singh</SelectItem>
                  <SelectItem value="abhishek">Abhishek Kumar</SelectItem>
                  <SelectItem value="rohit">Rohit Sharma</SelectItem>
                  <SelectItem value="priya">Priya Mehta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Enter any additional notes or remarks..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Supplier</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierDialog;