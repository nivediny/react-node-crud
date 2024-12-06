import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet } from "react-router-dom";
import { NAVIGATION } from "./layouts/SideBar";

const BRANDING = {
  title: "RABT",
};

export default function App() {
  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </AppProvider>
  );
}
