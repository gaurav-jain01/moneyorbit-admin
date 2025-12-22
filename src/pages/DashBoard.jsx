import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
} from "@mui/material";
import ButtonAppBar from "../components/layout/appBar";
import DashboardIpoSection from "../components/layout/dashboardIpoSection";
import {
  useAnalyticsData,
  MetricCards,
  AnalyticsCharts,
} from "../components/ui/EnhancedAnalytics";
import { CircularProgress } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const { stats, monthlyData, priceTrendData, loading } = useAnalyticsData();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) window.location.href = "/";
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <ButtonAppBar />

      <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            IPO Management Dashboard
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/ipo/new")}
            sx={{ minWidth: { xs: "100%", sm: "auto" } }}
          >
            Launch New IPO
          </Button>
        </Box>

        {/* Four Metric Cards - Full Width Horizontal */}
        <Box sx={{ mb: 4 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <MetricCards stats={stats} />
          )}
        </Box>

        {/* Three Charts - Line, Bar, Pie Chart */}
        <Box sx={{ mb: 4 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <AnalyticsCharts monthlyData={monthlyData} priceTrendData={priceTrendData} />
          )}
        </Box>

        {/* IPO Cards Section */}
        <Box>
          <DashboardIpoSection />
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;