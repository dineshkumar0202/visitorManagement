import {
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { addVisitor } from "../../services/visitorService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

const purposeOptions = [
  "Personal Visit",
  "Delivery",
  "Maintenance work (Plumbing)",
  "Maintenance work (Electrical)",
  "Courier / Package",
  "Guest",
  "Official / Business",
  "Other",
];

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontSize: "0.88rem",
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "#cbd5e1" },
    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.82rem",
    fontWeight: 500,
    color: "#64748b",
    "&.Mui-focused": { color: "#6366f1" },
  },
};

const VisitorForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    flatNumber: "",
    address: "",
    purpose: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.flatNumber) {
      setError("Please fill all required fields (Name, Phone, Flat Number)");
      return;
    }

    setLoading(true);
    try {
      await addVisitor(form);
      toast.success("Visitor registered successfully!");
      navigate("/visitors");
    } catch (err) {
      toast.error("Failed to add visitor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Form Card */}
      <Box
        sx={{
          maxWidth: 620,
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
          p: { xs: 3, md: 4 },
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5,
              borderRadius: "10px",
              fontSize: "0.82rem",
              "& .MuiAlert-icon": { fontSize: 20 },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Row 1: Name + Phone */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
            mb: 2.5,
          }}
        >
          <TextField
            fullWidth
            label="Visitor Name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />
        </Box>

        {/* Row 2: Address */}
        <Box sx={{ mb: 2.5 }}>
          <TextField
            fullWidth
            label="Address / Organization"
            name="address"
            placeholder="123 Corporate Way, Tech City"
            value={form.address}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />
        </Box>

        {/* Row 3: Flat + Purpose */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
            mb: 3.5,
          }}
        >
          <TextField
            fullWidth
            label="Flat / Office Number"
            name="flatNumber"
            placeholder="A-402"
            value={form.flatNumber}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ApartmentRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            select
            label="Purpose of Visit"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            sx={inputStyles}
          >
            <MenuItem value="" disabled>
              <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Select Purpose
              </Typography>
            </MenuItem>
            {purposeOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<PersonAddAltRoundedIcon />}
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "-0.2px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              boxShadow: "0 6px 24px rgba(99,102,241,0.45)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
            "&.Mui-disabled": {
              background: "#cbd5e1",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Registering..." : "Register Visitor"}
        </Button>
      </Box>
    </Box>
  );
};

export default VisitorForm;