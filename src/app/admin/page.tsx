import { DashboardCard } from './_components/DashboardCard';

import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';

async function getSalesData() {
  const [orderDetailsData, ordersData] = await Promise.all([
    db.orderDetail.aggregate({
      _sum: { pricePaidInCents: true },
    }),
    db.order.aggregate({
      _count: true,
    }),
  ]);

  return {
    amount: (orderDetailsData._sum.pricePaidInCents || 0) / 100,
    numberOfSales: ordersData._count,
  };
}

async function getProductsData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),
    db.product.count({
      where: {
        isAvailableForPurchase: false,
      },
    }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
}

export default async function AdminDashboard() {
  const [salesData, productsData] = await Promise.all([
    getSalesData(),
    getProductsData(),
  ]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Products"
        subtitle={`${formatNumber(productsData.activeCount)} Active Products`}
        body={`${formatNumber(productsData.inactiveCount)} Inactive Products`}
      />
    </div>
  );
}
