import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { StatsCards } from "@/components/admin/stats-cards";
import { RecentPurchases } from "@/components/admin/recent-purchases";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Get all users
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  const totalUsers = users.length;

  // Get all completed purchases
  const purchases = await prisma.purchase.findMany({
    where: {
      status: "completed",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalRevenue = purchases.reduce((acc, purchase) => acc + purchase.amount, 0);
  const totalPurchases = purchases.length;

  return (
    <div className="container space-y-8 py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <StatsCards
        totalUsers={totalUsers}
        totalRevenue={totalRevenue}
        totalPurchases={totalPurchases}
        users={users}
        purchases={purchases}
      />

      <RecentPurchases purchases={purchases.slice(0, 10)} />
    </div>
  );
} 