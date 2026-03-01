import {
  Typography,
  TextField,
  Box,
  CircularProgress,
  Tabs,
  Tab,
  Button,
  Pagination,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisitorCard from "../components/visitors/VisitorCard";
import { getVisitors, markVisitorExit, deleteVisitor } from "../services/visitorService";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const Visitors = () => {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const data = await getVisitors(page, 6, search, status);
      setVisitors(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch visitors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [page, search, status]);

  const handleExit = async (id: string) => {
    await markVisitorExit(id);
    fetchVisitors();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      try {
        await deleteVisitor(id);
        fetchVisitors();
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  return (
    <Box>
      {/* Header Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#1e293b", letterSpacing: "-0.3px" }}
          >
            Visitors Directory
          </Typography>
          <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>
            Manage and track guest access
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            placeholder="Search by name, flat, or phone..."
            size="small"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", md: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#fff",
                fontSize: "0.85rem",
                "&:hover fieldset": { borderColor: "#94a3b8" },
                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add-visitor")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              fontSize: "0.85rem",
              bgcolor: "#3b82f6",
              boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
              "&:hover": {
                bgcolor: "#2563eb",
                boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
              },
              whiteSpace: "nowrap",
            }}
          >
            New Visitor
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: "2px solid #f1f5f9",
          mb: 3,
        }}
      >
        <Tabs
          value={status}
          onChange={(_, newValue) => {
            setStatus(newValue);
            setPage(1);
          }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              color: "#94a3b8",
              minHeight: 42,
              px: 2,
              "&.Mui-selected": {
                color: "#3b82f6",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#3b82f6",
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab label="All Visitors" value="" />
          <Tab label="Currently Inside" value="Entered" />
          <Tab label="Exit History" value="Exited" />
          <Tab label="Deleted" value="Deleted" />
        </Tabs>
      </Box>

      {/* Cards Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress sx={{ color: "#3b82f6" }} />
        </Box>
      ) : visitors.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "#94a3b8",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No visitors found
          </Typography>
          <Typography sx={{ fontSize: "0.85rem" }}>
            {search
              ? "Try adjusting your search terms"
              : "Visitors will appear here once added"}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr",
                md: "repeat(2, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {visitors.map((visitor: any) => (
              <VisitorCard
                key={visitor._id}
                visitor={visitor}
                onExit={handleExit}
                onDelete={handleDelete}
              />
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    borderRadius: "8px",
                    "&.Mui-selected": {
                      bgcolor: "#3b82f6",
                      color: "#fff",
                      "&:hover": { bgcolor: "#2563eb" },
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Visitors;