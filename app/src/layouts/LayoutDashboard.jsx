import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Typography } from "@mui/material";

function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini ? "© NIVE" : `© ${new Date().getFullYear()} Designed by NIVE`}
    </Typography>
  );
}

export default function LayoutDashboard() {
  return (
    <DashboardLayout
      slots={{
        sidebarFooter: SidebarFooter,
      }}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
