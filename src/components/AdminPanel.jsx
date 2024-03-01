import React from "react";
import style from "./Admin.module.css";
import Header from "./Header/Header";
import AdminSidebar from "./Sidebar/AdminSidebar";
function AdminPanel() {
  return (
    <div>
      <Header />
      <AdminSidebar />
    </div>
  );
}

export default AdminPanel;
