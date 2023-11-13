import { Outlet } from "react-router-dom";
import GoogleHeader from "../Google/GoogleHeader";

const HomeLayout = () => {
  return (
    <>
      <GoogleHeader />
      <Outlet />
    </>
  );
};

export default HomeLayout;
