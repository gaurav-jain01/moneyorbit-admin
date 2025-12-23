import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllIpo } from "../../features/auth/api/ipo.api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EnhancedAnalytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    open: 0,
    closed: 0,
    listed: 0,
    totalIssueValue: 0,
    averageIssuePrice: 0,
  });
  const [monthlyData, setMonthlyData] = useState(null);
  const [priceTrendData, setPriceTrendData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getAllIpo();
      const ipos = response.data.data || [];

      // Calculate basic stats
      const statusCount = {
        UPCOMING: 0,
        OPEN: 0,
        CLOSED: 0,
        LISTED: 0,
        ALLOTED: 0,
        CANCELLED: 0,
      };

      let totalIssueValue = 0;
      let totalIssuePrice = 0;

      ipos.forEach((ipo) => {
        const status = ipo.status?.toUpperCase();
        if (statusCount[status] !== undefined) {
          statusCount[status]++;
        }
        totalIssuePrice += ipo.issuePrice || 0;
      });

      const averageIssuePrice = ipos.length > 0 ? totalIssuePrice / ipos.length : 0;

      setStats({
        total: ipos.length,
        upcoming: statusCount.UPCOMING,
        open: statusCount.OPEN,
        closed: statusCount.CLOSED,
        listed: statusCount.LISTED,
        totalIssueValue,
        averageIssuePrice: Math.round(averageIssuePrice),
      });

      // Monthly IPO count
      const monthlyCount = {};
      ipos.forEach((ipo) => {
        const month = new Date(ipo.issueOpenDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
        monthlyCount[month] = (monthlyCount[month] || 0) + 1;
      });

      const sortedMonths = Object.keys(monthlyCount).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      setMonthlyData({
        labels: sortedMonths,
        datasets: [
          {
            label: "IPOs Launched",
            data: sortedMonths.map((month) => monthlyCount[month]),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1,
          },
        ],
      });

      // Price trend (last 10 IPOs)
      const sortedByDate = [...ipos]
        .sort((a, b) => new Date(b.issueOpenDate) - new Date(a.issueOpenDate))
        .slice(0, 10)
        .reverse();

      setPriceTrendData({
        labels: sortedByDate.map((ipo) =>
          ipo.companyName.length > 15
            ? ipo.companyName.substring(0, 15) + "..."
            : ipo.companyName
        ),
        datasets: [
          {
            label: "Issue Price (₹)",
            data: sortedByDate.map((ipo) => ipo.issuePrice),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error loading analytics", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Key Metrics Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total IPOs
            </Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Active IPOs
            </Typography>
            <Typography variant="h4" color="primary">
              {stats.open}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Listed IPOs
            </Typography>
            <Typography variant="h4" color="success.main">
              {stats.listed}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Avg Issue Price
            </Typography>
            <Typography variant="h4">₹{stats.averageIssuePrice}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly IPO Trend */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom align="center">
              Monthly IPO Launch Trend
            </Typography>
            {monthlyData && (
              <Box 
                sx={{ 
                  height: 300,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ width: '100%', maxWidth: '100%' }}>
                  <Line
                    data={monthlyData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      layout: {
                        padding: {
                          left: 10,
                          right: 10,
                        }
                      },
                      plugins: {
                        legend: {
                          display: true,
                          position: "top",
                          align: "center",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Price Trend */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom align="center">
              Recent IPO Issue Prices
            </Typography>
            {priceTrendData && (
              <Box 
                sx={{ 
                  height: 300,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ width: '100%', maxWidth: '100%' }}>
                  <Bar
                    data={priceTrendData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      layout: {
                        padding: {
                          left: 10,
                          right: 10,
                        }
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}