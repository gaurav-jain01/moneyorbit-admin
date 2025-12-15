import * as React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IpoCard({ ipo }) {

  const navigate = useNavigate(null)
  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: 280, sm: 320, md: 350 }, // responsive width: mobile < tablet < desktop
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#f9f9fb",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 5,
        },
      }}
    >
      <CardContent sx={{ py: 1.5, px: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: "#1e1e2f", fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            {ipo.companyName}
          </Typography>
          <Chip
            label={ipo.status}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              backgroundColor: ipo.status === "OPEN" ? "#4caf50" : "#b0b0b0",
              color: "#fff",
            }}
          />
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        {/* IPO Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
          >
            <strong>Issue:</strong>{" "}
            {new Date(ipo.issueOpenDate).toLocaleDateString()} –{" "}
            {new Date(ipo.issueCloseDate).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
          >
            <strong>Price Band:</strong> ₹{ipo.priceRange.min} – ₹
            {ipo.priceRange.max}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
          >
            <strong>Lot Size:</strong> {ipo.lotSize || "N/A"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
          >
            <strong>IPO Score:</strong> {ipo.score || "N/A"} / 10
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
          >
            <strong>Risk:</strong> {ipo.risk || "N/A"} / 10
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.5 }}>
       
        <Button size="small" variant="contained" color="primary" onClick={() => navigate(`/ipo/${ipo._id}`)}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
