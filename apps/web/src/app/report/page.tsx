import ReportListPage from '@/features/report/components/report-list-page'
import { DashboardLayout } from '@/shared/components/dashboard-layout'
import React from 'react'

const ReportPage = () => {
    return (
        <DashboardLayout>
            <ReportListPage />
        </DashboardLayout>
    )
}

export default ReportPage
