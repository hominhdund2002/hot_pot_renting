import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { MenuItem } from "../../../types/menu";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();
  const cx = classNames.bind(styles);

  const menuItems: MenuItem[] = [
    { icon: <DashboardIcon />, label: "Dashboard", path: "/dashboard" },
    { icon: <PeopleIcon />, label: "Users", path: "/users" },
    { icon: <InventoryIcon />, label: "Products", path: "/products" },
    { icon: <BarChartIcon />, label: "Analytics", path: "/analytics" },
    { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
  ];

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <Box
      component="aside"
      className={cx("sidebar", { collapsed: isCollapsed })}
    >
      <Link to="/dashboard" className={cx("logo-wrapper")}>
        <Box className={cx("logo")}>
          <span className={cx("logo-text")}>LS</span>
        </Box>
        {!isCollapsed && <span className={cx("brand-name")}>Lẩu tự sôi</span>}
      </Link>

      <List component="nav" className={cx("nav-menu")}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.path}
            className={cx("nav-item", {
              active: location.pathname === item.path,
            })}
          >
            <ListItemIcon className={cx("nav-icon")}>{item.icon}</ListItemIcon>
            {!isCollapsed && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
