import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import Sidebar from "../components/Sidebar/Sidebar";
import User from "../components/User/User";
// import Dashboard from "../pages/Dashboard/Dashboard";
import "./AppLayout.css";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="app-content">
        <Header className="show">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaBars className="sidebar-toggle" />
          </button>
          <div className="show-header-content">
            <SearchBar />
            <User />
          </div>
        </Header>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
