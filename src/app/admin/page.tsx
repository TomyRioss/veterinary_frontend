import { DashboardCard } from './_components/DashboardCard';

import db from '@/db/db';

function getSalesData() {
  // db.
}

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="Specializations"
        description="Manage specializations"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
      />
    </div>
  );
}
