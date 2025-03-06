'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, ShoppingCart } from "lucide-react";
import { UserListModal } from "./user-list-modal";
import { RevenueModal } from "./revenue-modal";

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
}

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

interface StatsCardsProps {
  totalUsers: number;
  totalRevenue: number;
  totalPurchases: number;
  users: User[];
  purchases: Purchase[];
}

export function StatsCards({ totalUsers, totalRevenue, totalPurchases, users, purchases }: StatsCardsProps) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showPurchasesModal, setShowPurchasesModal] = useState(false);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setShowUserModal(true)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setShowRevenueModal(true)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime revenue</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setShowPurchasesModal(true)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPurchases}</div>
            <p className="text-xs text-muted-foreground">Completed purchases</p>
          </CardContent>
        </Card>
      </div>

      <UserListModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        users={users}
      />

      <RevenueModal
        isOpen={showRevenueModal}
        onClose={() => setShowRevenueModal(false)}
        purchases={purchases}
      />

      <RevenueModal
        isOpen={showPurchasesModal}
        onClose={() => setShowPurchasesModal(false)}
        purchases={purchases}
      />
    </>
  );
} 