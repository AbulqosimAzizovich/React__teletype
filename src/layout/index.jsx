import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 bg-white z-50">
        <nav className="py-[10px] shadow-sm">
          <Navbar />
        </nav>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
