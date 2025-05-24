/* eslint-disable @typescript-eslint/no-explicit-any */
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "../../../../api/authAPI";
import LogoContainer from "../../../../components/Logo/Logo";
import useAuth from "../../../../hooks/useAuth";
import { menuItems } from "./MenuItems";
import NotificationCenter from "../../../../pages/Global/Notification/NotificationsPage";

export const drawerWidth = 280;

type RoleTranslations = {
  [key: string]: string;
};

// Role translation mapping
const roleTranslations: RoleTranslations = {
  Staff: "Nhân viên",
  Manager: "Quản lý",
  Admin: "Quản trị viên",
};

const translateRole = (role: string | undefined): string => {
  if (!role) return "";
  return roleTranslations[role] || role;
};

interface SidebarDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ open, setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { auth } = useAuth();
  const role = auth?.user?.role;

  // State for expanding/collapsing menu categories
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>({});

  // User data (replace with actual user data)
  const userData = auth?.user;

  // Auto-expand categories that contain the current active route
  useEffect(() => {
    const currentRoleMenuItems =
      menuItems.find((item) => item.role == role)?.menu || [];

    const newOpenCategories: { [key: string]: boolean } = {};

    currentRoleMenuItems.forEach((menuItem) => {
      if (menuItem.children) {
        const hasActiveChild = menuItem.children.some((child) =>
          isActivePath(child.path)
        );
        if (hasActiveChild) {
          newOpenCategories[menuItem.label] = true;
        }
      }
    });

    setOpenCategories((prev) => ({ ...prev, ...newOpenCategories }));
  }, [location.pathname, role]);

  // Helper function to check if a path is active
  const isActivePath = (path: string): boolean => {
    if (!path || path === "#") return false;

    // Get current path without trailing slash
    const currentPath = location.pathname.replace(/\/$/, "") || "/";
    const menuPath = path.replace(/\/$/, "") || "/";

    // Exact match first
    if (currentPath === menuPath) return true;

    // For non-root paths, check if current path starts with menu path
    // but ensure we're matching complete path segments
    if (menuPath !== "/" && menuPath.length > 1) {
      const pathSegments = menuPath.split("/").filter(Boolean);
      const currentSegments = currentPath.split("/").filter(Boolean);

      // Must have at least as many segments as the menu path
      if (currentSegments.length < pathSegments.length) return false;

      // Check if all menu path segments match the beginning of current segments
      return pathSegments.every(
        (segment, index) => currentSegments[index] === segment
      );
    }

    return false;
  };

  // Helper function to check if a parent category should be highlighted
  const isParentActive = (menuItem: any): boolean => {
    if (!menuItem.children) return false;
    return menuItem.children.some((child: any) => isActivePath(child.path));
  };

  // Toggle category open/close
  const handleCategoryToggle = (label: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // User menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(anchorEl);
  const drawerVariant = isMobile ? "temporary" : "persistent";




  // Handle navigation
  const handleNavigation = (route: string) => {
    navigate(route);
    if (isMobile) setOpen(false);
  };

  // Handle user menu
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem("userInfor");
      handleUserMenuClose();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Find menu items for the current user role
  const currentRoleMenuItems =
    menuItems.find((item) => item.role == role)?.menu || [];

  // Translate the role for display
  const translatedRole = translateRole(userData?.role);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#ffffff",
          color: "#333",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > *": { transform: "scale(1.2)" },
            }}
          >
            <LogoContainer />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ mr: 2 }}>
        <NotificationCenter userId={userData?.id} />
      </Box>
          {/* User profile section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              avatar={
                userData?.avatar ? (
                  <Avatar alt={userData?.name} src={userData?.avatar} />
                ) : (
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                )
              }
              label={userData?.name}
              onClick={handleUserMenuOpen}
              sx={{
                height: 40,
                borderRadius: 20,
                "& .MuiChip-label": {
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  pr: 1,
                },
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={userMenuOpen}
              onClose={handleUserMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleUserMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Thông tin cá nhân</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Đăng xuất</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={drawerVariant}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            paddingTop: 12,
          },
        }}
      >
        {/* User welcome section */}
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: "0 auto",
              bgcolor: theme.palette.primary.main,
            }}
          >
            <Typography variant="h4">{userData?.name?.charAt(0)}</Typography>
          </Avatar>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Xin chào, {userData?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {translatedRole}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List component="nav" sx={{ px: 1 }}>
          {currentRoleMenuItems.map((menuItem, index) => {
            // If menu item has no children, render a simple list item
            if (!menuItem.children) {
              const isActive = isActivePath(menuItem.path);
              return (
                <ListItemButton
                  key={`${menuItem.label}-${index}`}
                  onClick={() =>
                    menuItem.path !== "#" && handleNavigation(menuItem.path)
                  }
                  selected={isActive}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    mx: 1,
                    transition: "all 0.2s ease-in-out",
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                      "& .MuiListItemIcon-root": {
                        color: theme.palette.primary.contrastText,
                      },
                    },
                    "&:hover": {
                      backgroundColor: isActive
                        ? theme.palette.primary.dark
                        : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive
                        ? theme.palette.primary.contrastText
                        : "inherit",
                      minWidth: 40,
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.label}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight: isActive ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              );
            }
            // If menu item has children, render expandable category
            const hasActiveChild = isParentActive(menuItem);
            return (
              <React.Fragment key={`${menuItem.label}-${index}`}>
                <ListItemButton
                  onClick={() => handleCategoryToggle(menuItem.label)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    mx: 1,
                    transition: "all 0.2s ease-in-out",
                    backgroundColor: hasActiveChild
                      ? "rgba(25, 118, 210, 0.08)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: hasActiveChild
                        ? "rgba(25, 118, 210, 0.12)"
                        : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.label}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight: hasActiveChild ? 600 : 400,
                      },
                    }}
                  />
                  {openCategories[menuItem.label] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse
                  in={openCategories[menuItem.label]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {menuItem.children.map((childItem, childIndex) => {
                      const isChildActive = isActivePath(childItem.path);
                      return (
                        <ListItemButton
                          key={`${childItem.label}-${childIndex}`}
                          sx={{
                            pl: 4,
                            borderRadius: 1,
                            mb: 0.5,
                            mx: 1,
                            transition: "all 0.2s ease-in-out",
                            "&.Mui-selected": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                              "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                              },
                              "& .MuiListItemIcon-root": {
                                color: theme.palette.primary.contrastText,
                              },
                            },
                            "&:hover": {
                              backgroundColor: isChildActive
                                ? theme.palette.primary.dark
                                : "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                          selected={isChildActive}
                          onClick={() => handleNavigation(childItem.path)}
                        >
                          <ListItemIcon
                            sx={{
                              color: isChildActive
                                ? theme.palette.primary.contrastText
                                : "inherit",
                              minWidth: 40,
                            }}
                          >
                            {childItem.icon || menuItem.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={childItem.label}
                            sx={{
                              "& .MuiTypography-root": {
                                fontWeight: isChildActive ? 600 : 400,
                              },
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default SidebarDrawer;
