import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LeadsTableProps {
  leads: any[];
  category: string;
}

const LeadsTable = ({ leads, category }: LeadsTableProps) => {
  const navigate = useNavigate();

  const getCategoryBadge = () => {
    switch (category) {
      case "seasonal":
        return "Seasonal";
      case "pending":
        return "Pending Dispatch";
      case "payment":
        return "Payment Complete";
      default:
        return category;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Crop</TableHead>
            <TableHead>PO/DO Number</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>AI Reason</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell className="text-sm">{lead.location}</TableCell>
              <TableCell className="text-sm">{lead.crop}</TableCell>
              <TableCell className="font-mono text-xs">
                {lead.poNumber || "N/A"}
                {lead.doNumber && <div>{lead.doNumber}</div>}
              </TableCell>
              <TableCell>
                {lead.priority === "high" ? (
                  <Badge variant="destructive">High</Badge>
                ) : (
                  <Badge variant="secondary">Medium</Badge>
                )}
              </TableCell>
              <TableCell className="text-sm">{lead.assignedTo}</TableCell>
              <TableCell className="text-sm max-w-xs">
                <p className="truncate" title={lead.reason}>
                  {lead.reason}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/supplier/${lead.id}`)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsTable;
