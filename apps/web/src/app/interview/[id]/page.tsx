import InterviewScreen
    from "@/features/interview/components/inteview-screen";
import { DashboardLayout } from "@/shared/components/dashboard-layout";

export default function Page() {

    return (
        <DashboardLayout>
            <InterviewScreen />
        </DashboardLayout>
    );

}