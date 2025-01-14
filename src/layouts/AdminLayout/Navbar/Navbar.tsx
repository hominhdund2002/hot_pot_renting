import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  MenuOpen as MenuOpenIcon,
} from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  onMenuClick?: () => void;
  isSidebarCollapsed: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isSidebarCollapsed }) => {
  const cx = classNames.bind(styles);
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      className={cx("navbar")}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          aria-label="menu"
        >
          {!isSidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>

        <Box className={cx("search-wrapper")}>
          <SearchIcon className={cx("search-icon")} />
          <InputBase
            placeholder="Search..."
            className={cx("search-input")}
            inputProps={{ "aria-label": "search" }}
          />
        </Box>

        <Box className={cx("navbar-actions")}>
          <IconButton aria-label="notifications">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar className={cx("user-avatar")}>U</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
