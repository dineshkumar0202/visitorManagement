import { Box, Typography } from "@mui/material";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

const Reports = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 400,
                gap: 2,
            }}
        >
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "16px",
                    bgcolor: "#f0fdf4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <AssessmentRoundedIcon sx={{ fontSize: 32, color: "#10b981" }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#1e293b" }}>
                Reports
            </Typography>
            <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem", textAlign: "center", maxWidth: 360 }}>
                Visitor reports and analytics will appear here. This feature is coming soon.
            </Typography>
        </Box>
    );
};

export default Reports;
