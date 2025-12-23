import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllIpo } from "../../features/auth/api/ipo.api";
import { Box, CircularProgress } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function IpoDoughnutChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIpoStats();
  }, []);

  const fetchIpoStats = async () => {
    try {
      const response = await getAllIpo();
      const ipos = response.data.data || [];

      const statusCount = {
        UPCOMING: 0,
        OPEN: 0,
        CLOSED: 0,
        LISTED: 0,
      };

      ipos.forEach((ipo) => {
        const status = ipo.status?.toUpperCase();
        if (statusCount[status] !== undefined) {
          statusCount[status]++;
        }
      });

      setChartData({
        labels: [
          "Upcoming IPOs",
          "Open IPOs",
          "Closed IPOs",
          "Listed IPOs",
        ],
        datasets: [
          {
            label: "IPO Status",
            data: [
              statusCount.UPCOMING,
              statusCount.OPEN,
              statusCount.CLOSED,
              statusCount.LISTED,
            ],
            backgroundColor: [
              "#FFC107", // Upcoming
              "#4CAF50", // Open
              "#F44336", // Closed
              "#2196F3", // Listed
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error loading IPO stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      maxWidth: 300,
      margin: '0 auto'
    }}>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          plugins: {
            legend: {
              position: "bottom",
              align: "center",
            },
          },
        }}
      />
    </Box>
  );
}
