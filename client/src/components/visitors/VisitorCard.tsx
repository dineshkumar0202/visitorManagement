import {
    Box,
    Typography,
    Button,
    Chip,
    Avatar,
    Stack,
    Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import useAuth from "../../hooks/useAuth";

interface Visitor {
    _id: string;
    name: string;
    phone: string;
    flatNumber: string;
    address?: string;
    purpose?: string;
    entryTime: string;
    exitTime?: string;
    status: string;
}

interface Props {
    visitor: Visitor;
    onExit: (id: string) => void;
    onDelete: (id: string) => void;
}

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
    Entered: {
        label: "CURRENTLY INSIDE",
        color: "#0d9e4f",
        bg: "#e6f9ee",
        border: "#0d9e4f",
    },
    Exited: {
        label: "CHECKED OUT",
        color: "#6b7280",
        bg: "#f3f4f6",
        border: "#d1d5db",
    },
    Deleted: {
        label: "DELETED",
        color: "#dc2626",
        bg: "#fef2f2",
        border: "#dc2626",
    },
};

function getStayDuration(entryTime: string, exitTime?: string): string {
    const start = new Date(entryTime).getTime();
    const end = exitTime ? new Date(exitTime).getTime() : Date.now();
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

const VisitorCard = ({ visitor, onExit, onDelete }: Props) => {
    const { role } = useAuth();
    const config = statusConfig[visitor.status] || statusConfig.Entered;

    return (
        <Box
            sx={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                borderLeft: `4px solid ${config.border}`,
                p: { xs: 2, sm: 2.5 },
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                transition: "all 0.2s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    transform: "translateY(-2px)",
                },
            }}
        >
            {/* Top Row: Avatar + Name + Status */}
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 44,
                            height: 44,
                            bgcolor: config.border,
                            fontSize: "0.9rem",
                            fontWeight: 700,
                        }}
                    >
                        {getInitials(visitor.name)}
                    </Avatar>
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>
                            {visitor.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
                            <PhoneIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                            <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>
                                {visitor.phone}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Chip
                    label={config.label}
                    size="small"
                    sx={{
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.5px",
                        color: config.color,
                        bgcolor: config.bg,
                        border: `1px solid ${config.color}20`,
                        borderRadius: "6px",
                        height: 24,
                    }}
                />
            </Box>

            <Divider sx={{ borderColor: "#f1f5f9" }} />

            {/* Details Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Box>
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.3 }}>
                        Entry Point / Flat
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <ApartmentIcon sx={{ fontSize: 14, color: "#64748b" }} />
                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
                            Flat {visitor.flatNumber}
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.3 }}>
                        {visitor.status === "Exited" ? "Stay Duration" : "Check-in Time"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 14, color: "#64748b" }} />
                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
                            {visitor.status === "Exited"
                                ? getStayDuration(visitor.entryTime, visitor.exitTime)
                                : new Date(visitor.entryTime).toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Address */}
            {visitor.address && (
                <Box>
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.3 }}>
                        Resident Address
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 14, color: "#64748b" }} />
                        <Typography sx={{ fontSize: "0.82rem", color: "#475569" }}>
                            {visitor.address}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Purpose */}
            {visitor.purpose && (
                <Box>
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", mb: 0.3 }}>
                        Purpose
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 14, color: "#64748b" }} />
                        <Typography sx={{ fontSize: "0.82rem", color: "#475569" }}>
                            {visitor.purpose}
                        </Typography>
                    </Box>
                </Box>
            )}

            <Divider sx={{ borderColor: "#f1f5f9" }} />

            {/* Action Buttons */}
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                {role === "Admin" && visitor.status !== "Deleted" && (
                    <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />}
                        onClick={() => onDelete(visitor._id)}
                        sx={{
                            textTransform: "none",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            borderRadius: "8px",
                            px: 1.5,
                        }}
                    >
                        Delete
                    </Button>
                )}

                {visitor.status === "Entered" && (
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<ExitToAppIcon sx={{ fontSize: 16 }} />}
                        onClick={() => onExit(visitor._id)}
                        sx={{
                            textTransform: "none",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            borderRadius: "8px",
                            px: 2,
                            bgcolor: "#1e293b",
                            "&:hover": { bgcolor: "#0f172a" },
                        }}
                    >
                        Exit Now
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default VisitorCard;
