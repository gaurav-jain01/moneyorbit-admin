import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import IpoCard from "../ui/ipoCard";
import { getAllIpo } from "../../features/auth/api/ipo.api";

export default function DashboardIpoSection() {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIpo = async () => {
      try {
        const response = await getAllIpo();
        setIpos(response.data.data);
      } catch (err) {
        console.log("error into ipo loading", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIpo();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        Recent IPOs
      </Typography>

      {Array.isArray(ipos) && ipos.length > 0 ? (
        <>
          <Grid container spacing={3} justifyContent="center">
            {ipos.slice(0, 3).map((ipo) => (
              <Grid item xs={12} sm={6} md={4} key={ipo._id}>
                <IpoCard ipo={ipo} />
              </Grid>
            ))}
          </Grid>

          {ipos.length > 3 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                pt: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/ipopage")}
              >
                View All IPOs
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No IPOs available
          </Typography>
        </Box>
      )}
    </Box>
  );
}
