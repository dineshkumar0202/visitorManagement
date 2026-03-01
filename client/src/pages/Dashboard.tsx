import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

interface StatsData {
  totalAll: number;
  totalToday: number;
  inside: number;
  exited: number;
  deleted: number;
  weeklyTrends: { day: string; visitors: number }[];
  statusDistribution: { name: string; value: number; color: string }[];
  efficiency: number;
}

/* ───── Stat Card ───── */
function StatCard({
  icon,
  iconBg,
  label,
  value,
  trend,
  trendLabel,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: number;
  trend?: "up" | "down" | "steady";
  trendLabel?: string;
}) {
  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #f1f5f9",
        p: { xs: 2, sm: 2.5 },
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Top row: icon + trend */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            bgcolor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        {trend && trendLabel && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.3,
              px: 1,
              py: 0.3,
              borderRadius: "6px",
              bgcolor:
                trend === "up"
                  ? "#ecfdf5"
                  : trend === "down"
                    ? "#fef2f2"
                    : "#f8fafc",
            }}
          >
            {trend === "up" ? (
              <TrendingUpRoundedIcon sx={{ fontSize: 14, color: "#10b981" }} />
            ) : trend === "down" ? (
              <TrendingDownRoundedIcon sx={{ fontSize: 14, color: "#ef4444" }} />
            ) : null}
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color:
                  trend === "up"
                    ? "#10b981"
                    : trend === "down"
                      ? "#ef4444"
                      : "#94a3b8",
              }}
            >
              {trendLabel}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Label */}
      <Typography
        sx={{
          fontSize: "0.7rem",
          fontWeight: 600,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}
      >
        {label}
      </Typography>

      {/* Value */}
      <Typography
        sx={{
          fontSize: "1.8rem",
          fontWeight: 800,
          color: "#1e293b",
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
      >
        {value.toLocaleString()}
      </Typography>
    </Box>
  );
}

/* ───── Donut Center Label ───── */
function DonutCenterLabel({ efficiency }: { efficiency: number }) {
  return (
    <text
      x="50%"
      y="46%"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fill: "#1e293b", fontWeight: 800, fontSize: "1.5rem" }}
    >
      {efficiency}%
      <tspan
        x="50%"
        dy="22"
        style={{
          fill: "#94a3b8",
          fontSize: "0.55rem",
          fontWeight: 600,
          letterSpacing: "1.5px",
        }}
      >
        EFFICIENCY
      </tspan>
    </text>
  );
}

/* ───── Dashboard ───── */
const Dashboard = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data.data);
    } catch (error) {
      console.error("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <CircularProgress sx={{ color: "#6366f1" }} />
      </Box>
    );
  }

  const DONUT_COLORS = ["#6366f1", "#3b82f6", "#e2e8f0"];

  return (
    <Box>
      {/* ───── Stat Cards ───── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 1.5, md: 2.5 },
          mb: 3,
        }}
      >
        <StatCard
          icon={<PeopleAltRoundedIcon sx={{ fontSize: 20, color: "#6366f1" }} />}
          iconBg="#eef2ff"
          label="Total Visitors"
          value={stats.totalAll}
          trend="up"
          trendLabel={`+${stats.totalToday} today`}
        />
        <StatCard
          icon={<LoginRoundedIcon sx={{ fontSize: 20, color: "#10b981" }} />}
          iconBg="#ecfdf5"
          label="Currently Inside"
          value={stats.inside}
          trend={stats.inside > 0 ? "up" : "steady"}
          trendLabel={stats.inside > 0 ? "Active" : "None"}
        />
        <StatCard
          icon={<LogoutRoundedIcon sx={{ fontSize: 20, color: "#3b82f6" }} />}
          iconBg="#eff6ff"
          label="Total Exited"
          value={stats.exited}
          trend="steady"
          trendLabel="Steady"
        />
        <StatCard
          icon={<BlockRoundedIcon sx={{ fontSize: 20, color: "#ef4444" }} />}
          iconBg="#fef2f2"
          label="Deleted"
          value={stats.deleted}
          trend={stats.deleted > 0 ? "down" : "steady"}
          trendLabel={stats.deleted > 0 ? `${stats.deleted} total` : "None"}
        />
      </Box>

      {/* ───── Charts Row ───── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.6fr 1fr" },
          gap: 2.5,
        }}
      >
        {/* ── Area Chart ── */}
        <Box
          sx={{
            background: "#fff",
            borderRadius: "14px",
            border: "1px solid #f1f5f9",
            p: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#1e293b" }}>
                Visitor Traffic Trends
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", mt: 0.3 }}>
                Daily analytics for the current week
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                bgcolor: "#f1f5f9",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  bgcolor: "#1e293b",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                7 Days
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  color: "#64748b",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { color: "#1e293b" },
                }}
              >
                30 Days
              </Box>
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={stats.weeklyTrends}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  padding: "8px 14px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#94a3b8", fontSize: "0.7rem", marginBottom: 4 }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#colorVisitors)"
                dot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* ── Donut Chart ── */}
        <Box
          sx={{
            background: "#fff",
            borderRadius: "14px",
            border: "1px solid #f1f5f9",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#1e293b" }}>
              Status Distribution
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", mt: 0.3 }}>
              Real-time status split
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={stats.statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {stats.statusDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <DonutCenterLabel efficiency={stats.efficiency} />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mt: 1 }}>
            {stats.statusDistribution.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: DONUT_COLORS[i],
                    }}
                  />
                  <Typography sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b" }}>
                  {item.value.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;