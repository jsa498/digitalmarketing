'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

interface Purchase {
  id: string;
  user: {
    name: string | null;
    email: string;
  };
  product: {
    title: string;
  };
  amount: number;
  status: string;
  createdAt: Date;
}

interface RecentPurchasesProps {
  purchases: Purchase[];
}

export function RecentPurchases({ purchases }: RecentPurchasesProps) {
  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold">Recent Purchases</div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{purchase.user.name || 'Anonymous'}</div>
                    <div className="text-sm text-muted-foreground">
                      {purchase.user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{purchase.product.title}</TableCell>
                <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <div className={`capitalize ${
                    purchase.status === 'completed' 
                      ? 'text-green-600' 
                      : purchase.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {purchase.status}
                  </div>
                </TableCell>
                <TableCell>{formatDate(purchase.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 