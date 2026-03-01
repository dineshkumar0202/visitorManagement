import {
  Box,
  Typography,
  Avatar,
  InputBase,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Sidebar, { drawerWidth } from "./Sidebar";
import { ReactNode } from "react";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import useAuth from "../hooks/useAuth";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/visitors": "Visitors",
  "/add-visitor": "Add Visitor",
  "/reports": "Reports",
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const MainLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { role } = useAuth();

  const pageTitle = pageTitles[location.pathname] || "Page";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          ml: `${drawerWidth}px`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Navbar */}
        <Box
          sx={{
            height: 70,
            px: 3.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            borderBottom: "1px solid #f1f5f9",
            position: "sticky",
            top: 0,
            zIndex: 1100,
          }}
        >
          {/* Left: Page Title */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.15rem",
                color: "#1e293b",
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
              }}
            >
              {pageTitle}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              {getGreeting()}, {role === "Admin" ? "Admin" : "User"} 👋
            </Typography>
          </Box>

          {/* Right: Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Date Display */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.8,
                px: 1.5,
                py: 0.7,
                borderRadius: "8px",
                border: "1px solid #f1f5f9",
                mr: 0.5,
              }}
            >
              <CalendarTodayRoundedIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>
                {formatDate()}
              </Typography>
            </Box>

            {/* Notifications */}
            <Tooltip title="Notifications" arrow>
              <IconButton
                sx={{
                  color: "#64748b",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                <Badge
                  variant="dot"
                  sx={{
                    "& .MuiBadge-dot": {
                      backgroundColor: "#3b82f6",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                    },
                  }}
                >
                  <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Avatar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                ml: 1,
                pl: 1.5,
                borderLeft: "1px solid #f1f5f9",
              }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {role === "Admin" ? "A" : "S"}
              </Avatar>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#1e293b",
                    lineHeight: 1.2,
                  }}
                >
                  {role === "Admin" ? "Admin" : "Security"}
                </Typography>
                <Typography sx={{ fontSize: "0.65rem", color: "#94a3b8" }}>
                  {role}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3.5,
            backgroundColor: "#f8fafc",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;