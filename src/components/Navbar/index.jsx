import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import {
  PlusCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Dropdown, Popconfirm } from "antd";

const Navbar = () => {
  const confirm = () => {
    localStorage.clear();
    localStorage.removeItem("my_id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("full_name");
    window.location.reload();
  };

  const items = [
    {
      key: "1",
      label: (
        <NavLink to={`/user/profile/${localStorage.getItem("my_id")}`}>
          <div className="flex items-center gap-[7px] text-[17px]">
            <UserOutlined />
            Profile
          </div>
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Log out"
          description="Are you sure to log out?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <div className="hoverEffect flex items-center gap-[7px] text-[17px]">
            <LogoutOutlined />
            <span>Log Out</span>
          </div>
        </Popconfirm>
      ),
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="container flex items-center justify-between">
      <img
        title="teletype blog app"
        src={Logo}
        width="70px"
        alt="Logo"
        onClick={() => navigate("/")}
        className="cursor-pointer"
      />
      {localStorage.getItem("token") ? (
        <div className="flex items-center gap-[20px] m-2">
          <PlusCircleOutlined
            className="text-[27px] hover:opacity-[0.5] cursor-pointer"
            onClick={() => navigate("/create")}
          />
          <div className="h-[40px] w-[2px] bg-slate-500"></div>
          {/*<div className="flex items-center gap-2 hover:opacity-[0.5] cursor-pointer">*/}
          {/*  <UserOutlined className="text-[27px]" />*/}
          {/*  <span className="font-semibold text-[20px]">*/}
          {/*    {localStorage.getItem("full_name")}*/}
          {/*  </span>*/}
          {/*</div>*/}
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            trigger="click"
            arrow
          >
            <MenuOutlined className="text-[25px]" />
          </Dropdown>
        </div>
      ) : (
        <button
          onClick={() => navigate("/sign-in")}
          className="bg-blue-500 py-[9px] px-[15px] text-white rounded-lg"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Navbar;
