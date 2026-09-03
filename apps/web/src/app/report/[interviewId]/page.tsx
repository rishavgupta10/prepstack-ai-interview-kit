import InterviewReport from "@/features/report/components/report-screen";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { Navbar } from "@/shared/components/NavBar";


export default function Page() {


    return (
        <DashboardLayout>
            <div>
                <InterviewReport />
            </div>
        </DashboardLayout>
    );

}