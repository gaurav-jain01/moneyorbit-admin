import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIpoById } from "../features/auth/api/ipo.api";
import  AppBar from "../components/layout/appBar";


import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

export default function IpoDetail() {
  const { id } = useParams();
  const [ipo, setIpo] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchIpo = async () => {
      try {
        const res = await getIpoById(id);
        setIpo(res.data.data);
        setFormData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIpo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("UPDATED DATA:", formData);
    setIpo(formData);
    setEditMode(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ipo) return null;

  return (
    <>
    <AppBar/>
    <Box sx={{mx: "auto", mt: 6, px: 2 }}>
      <Card >
        <CardContent>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {editMode ? (
              <TextField
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                size="small"
              />
            ) : (
              <Typography variant="h6" fontWeight={700}>
                {ipo.companyName}
              </Typography>
            )}

            <Chip
              label={editMode ? formData.status : ipo.status}
              sx={{
                backgroundColor:
                  (editMode ? formData.status : ipo.status) === "OPEN"
                    ? "#4caf50"
                    : "#9e9e9e",
                color: "#fff",
                fontWeight: 600,
              }}
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Details */}
          {editMode ? (
            <>
              <DateField
                label="Issue Open Date"
                name="issueOpenDate"
                value={formData.issueOpenDate}
                onChange={handleChange}
              />
              <DateField
                label="Issue Close Date"
                name="issueCloseDate"
                value={formData.issueCloseDate}
                onChange={handleChange}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Price Min"
                  name="min"
                  value={formData.priceRange.min}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Price Max"
                  name="max"
                  value={formData.priceRange.max}
                  size="small"
                  fullWidth
                />
              </Box>

              <TextField
                label="Issue Price"
                name="issuePrice"
                type="number"
                value={formData.issuePrice}
                onChange={handleChange}
                size="small"
                fullWidth
                sx={{ mt: 2 }}
              />

              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                size="small"
                sx={{ mt: 2 }}
              >
                <MenuItem value="OPEN">OPEN</MenuItem>
                <MenuItem value="CLOSED">CLOSED</MenuItem>
                <MenuItem value="LISTED">LISTED</MenuItem>
              </TextField>
            </>
          ) : (
            <>
              <InfoRow
                label="Issue Date"
                value={`${formatDate(ipo.issueOpenDate)} – ${formatDate(
                  ipo.issueCloseDate
                )}`}
              />
              <InfoRow
                label="Price Band"
                value={`₹${ipo.priceRange.min} – ₹${ipo.priceRange.max}`}
              />
              <InfoRow label="Issue Price" value={`₹${ipo.issuePrice}`} />
              <InfoRow
                label="Listing Date"
                value={formatDate(ipo.listingDate)}
              />
            </>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {editMode ? (
              <>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="outlined"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
    </>
  );
}

/* Reusable components */
const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600}>
      {value}
    </Typography>
  </Box>
);

const DateField = ({ label, name, value, onChange }) => (
  <TextField
    label={label}
    name={name}
    type="date"
    value={value.split("T")[0]}
    onChange={onChange}
    size="small"
    fullWidth
    InputLabelProps={{ shrink: true }}
    sx={{ mb: 2 }}
  />
);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
