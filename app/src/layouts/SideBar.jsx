import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';

export const NAVIGATION = [
  {
    kind: "header",
    title: "",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "about",
    title: "About Us",
    icon: <BusinessIcon  />,
  },
  {
    segment: "Users",
    title: "Users",
    icon: <ShoppingCartIcon />,
  },
  // {
  //   kind: "divider",
  // },
  // {
  //   kind: "header",
  //   title: "",
  // },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "sales",
  //       title: "Sales",
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: "traffic",
  //       title: "Traffic",
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: "integrations",
  //   title: "Integrations",
  //   icon: <LayersIcon />,
  // },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "System",
  },
  // {
  //   segment: "settings",
  //   title: "Settings",
  //   icon: <SettingsIcon />,
  // },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];
