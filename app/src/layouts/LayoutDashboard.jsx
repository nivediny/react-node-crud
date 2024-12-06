import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

export default function LayoutDashboard() {
  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
