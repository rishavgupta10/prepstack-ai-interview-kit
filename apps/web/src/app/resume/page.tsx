import {
  DashboardLayout,
} from "@/shared/components/dashboard-layout";

import { ResumeOverview } from "@/features/resume/components/resuume-overview";

export default function ResumePage() {

  return (
    <DashboardLayout>
      
<div className="md:p-10">

      <ResumeOverview/>
</div>

    </DashboardLayout>
  );

}