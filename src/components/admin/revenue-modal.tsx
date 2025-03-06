'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Purchase {
  id: string;
  amount: number;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  product: {
    title: string;
  };
}

interface RevenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: Purchase[];
}

export function RevenueModal({ isOpen, onClose, purchases }: RevenueModalProps) {
  const [timeFrame, setTimeFrame] = useState('all');

  const filterPurchases = () => {
    const now = new Date();
    return purchases.filter(purchase => {
      const purchaseDate = new Date(purchase.createdAt);
      switch (timeFrame) {
        case 'today':
          return purchaseDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          return purchaseDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return purchaseDate >= monthAgo;
        case 'year':
          const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
          return purchaseDate >= yearAgo;
        default:
          return true;
      }
    });
  };

  const filteredPurchases = filterPurchases();
  const totalRevenue = filteredPurchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Revenue Overview</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-xl font-bold">
            Total: ${totalRevenue.toFixed(2)}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{new Date(purchase.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div>
                      <div>{purchase.user.name || 'Anonymous'}</div>
                      <div className="text-sm text-muted-foreground">{purchase.user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{purchase.product.title}</TableCell>
                  <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
} 