import { Box, Typography, Avatar, IconButton, Tooltip, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import useAuth from "../hooks/useAuth";

const drawerWidth = 240;

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    adminOnly?: boolean;
}

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { role } = useAuth();

    const navItems: NavItem[] = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: <DashboardRoundedIcon sx={{ fontSize: 20 }} />,
        },
        {
            label: "Visitors",
            path: "/visitors",
            icon: <PeopleAltRoundedIcon sx={{ fontSize: 20 }} />,
        },
        {
            label: "Add Visitor",
            path: "/add-visitor",
            icon: <PersonAddAltRoundedIcon sx={{ fontSize: 20 }} />,
            adminOnly: true,
        },
        
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <Box
            sx={{
                width: drawerWidth,
                minWidth: drawerWidth,
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1200,
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                borderRight: "1px solid #f1f5f9",
                overflow: "hidden",
            }}
        >
            {/* Brand */}
            <Box
                sx={{
                    p: 2.5,
                    pb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #10b981, #34d399)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 3px 10px rgba(16,185,129,0.25)",
                    }}
                >
                    <SecurityRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: "#1e293b",
                            fontWeight: 800,
                            fontSize: "1rem",
                            letterSpacing: "-0.2px",
                            lineHeight: 1.2,
                        }}
                    >
                        VMS
                    </Typography>
                    <Typography
                        sx={{
                            color: "#94a3b8",
                            fontSize: "0.62rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "1.2px",
                        }}
                    >
                        Visitor Management
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ borderColor: "#f1f5f9", mx: 2, mb: 1 }} />

            {/* Navigation */}
            <Box sx={{ flex: 1, py: 1, px: 1.5, display: "flex", flexDirection: "column", gap: 0.3 }}>
                <Typography
                    sx={{
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        color: "#10b981",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        px: 1.5,
                        mb: 1,
                        mt: 0.5,
                    }}
                >
                    Main Menu
                </Typography>

                {navItems.map((item) => {
                    if (item.adminOnly && role !== "Admin") return null;

                    const isActive = location.pathname === item.path;

                    return (
                        <Box
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                px: 1.5,
                                py: 1.2,
                                borderRadius: "10px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                position: "relative",
                                background: isActive ? "#f0fdf4" : "transparent",
                                "&:hover": {
                                    background: isActive ? "#f0fdf4" : "#f8fafc",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "9px",
                                    bgcolor: isActive ? "#10b981" : "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.2s ease",
                                    color: isActive ? "#fff" : "#94a3b8",
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "0.88rem",
                                    fontWeight: isActive ? 600 : 500,
                                    color: isActive ? "#1e293b" : "#64748b",
                                    flex: 1,
                                    transition: "color 0.2s ease",
                                }}
                            >
                                {item.label}
                            </Typography>

                            {/* Active indicator bar */}
                            {isActive && (
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 20,
                                        borderRadius: "4px",
                                        bgcolor: "#10b981",
                                    }}
                                />
                            )}
                        </Box>
                    );
                })}
            </Box>

            {/* User Section */}
            <Box sx={{ p: 2 }}>
                <Divider sx={{ borderColor: "#f1f5f9", mb: 2 }} />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 0.5,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <Avatar
                            sx={{
                                width: 38,
                                height: 38,
                                bgcolor: "#f0fdf4",
                                color: "#10b981",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                border: "2px solid #d1fae5",
                            }}
                        >
                            {role === "Admin" ? "A" : "S"}
                        </Avatar>
                        <Box>
                            <Typography
                                sx={{
                                    color: "#1e293b",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                }}
                            >
                                {role === "Admin" ? "Admin" : "Security"}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#94a3b8",
                                    fontSize: "0.7rem",
                                }}
                            >
                                {role === "Admin" ? "System Admin" : "Guard"}
                            </Typography>
                        </Box>
                    </Box>

                    <Tooltip title="Logout" arrow>
                        <IconButton
                            onClick={handleLogout}
                            size="small"
                            sx={{
                                color: "#94a3b8",
                                border: "1px solid #f1f5f9",
                                borderRadius: "8px",
                                width: 32,
                                height: 32,
                                "&:hover": {
                                    color: "#ef4444",
                                    borderColor: "#fecaca",
                                    bgcolor: "#fef2f2",
                                },
                            }}
                        >
                            <LogoutRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export { drawerWidth };
export default Sidebar;