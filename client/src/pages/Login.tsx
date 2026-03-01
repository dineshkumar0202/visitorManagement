import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(email, password);
      const token = data.token;
      localStorage.setItem("token", token);
      const decoded: any = jwtDecode(token);
      localStorage.setItem("role", decoded.role);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid email or password");
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 30%, #f8fafc 60%, #eef2ff 100%)",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: { xs: "16px", sm: "20px" },
          border: "1px solid #f1f5f9",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Brand */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #10b981, #34d399)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
              mb: 2,
            }}
          >
            <SecurityRoundedIcon sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.3rem", sm: "1.5rem" },
              color: "#1e293b",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "0.85rem",
              mt: 0.5,
            }}
          >
            Sign in to Visitor Management System
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5,
              borderRadius: "10px",
              fontSize: "0.82rem",
            }}
          >
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "0.9rem",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#cbd5e1" },
                "&.Mui-focused fieldset": { borderColor: "#10b981" },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.85rem",
                "&.Mui-focused": { color: "#10b981" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOffRoundedIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
                    ) : (
                      <VisibilityRoundedIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "0.9rem",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#cbd5e1" },
                "&.Mui-focused fieldset": { borderColor: "#10b981" },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.85rem",
                "&.Mui-focused": { color: "#10b981" },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "-0.2px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #059669, #047857)",
                boxShadow: "0 6px 24px rgba(16,185,129,0.45)",
                transform: "translateY(-1px)",
              },
              "&:active": { transform: "translateY(0px)" },
              "&.Mui-disabled": {
                background: "#cbd5e1",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            mt: 3,
            color: "#94a3b8",
            fontSize: "0.75rem",
          }}
        >
          Visitor Management System © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;