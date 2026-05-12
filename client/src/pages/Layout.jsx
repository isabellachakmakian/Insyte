import TopBar from "./top-bar/TopBar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}