import DashboardStats from "@/features/dashboard/components/dashboard-stats";
import { DashboardSummary } from "@/features/dashboard/components/dashboard-summary";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import {
  DashboardLayout,
} from "@/shared/components/dashboard-layout";

export default function DashboardPage() {

  return (
    <DashboardLayout>

      <div
        className="
        space-y-6
        md:p-6
        p-2
        pt-10
        "
      >

        <DashboardSummary />
        <DashboardStats />

        <QuickActions />

      </div>

    </DashboardLayout>
  );

}