import React from "react";
import { Outlet } from "react-router-dom";
import LawFirmSidebar from "../../Components/LawFirm/LawFirmSidebar"; // apna sidebar path

const LawFirmLayout = () => {
  return (
    <div className="lawfirm-layout">
      <LawFirmSidebar />

      <div className="lawfirm-content">
        <Outlet />
      </div>
    </div>
  );
};

export default LawFirmLayout;
