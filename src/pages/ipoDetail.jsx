import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIpoById, updateIpo, updateIpoStatus, deleteIpo } from "../features/auth/api/ipo.api";
import AppBar from "../components/layout/appBar";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";

export default function IpoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ipo, setIpo] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchIpo = async () => {
      try {
        const res = await getIpoById(id);
        setIpo(res.data.data);
        setFormData(res.data.data);
      } catch (err) {
        console.error(err);
        showSnackbar("Failed to load IPO details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchIpo();
  }, [id]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceRangeChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [field]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        issuePrice: Number(formData.issuePrice),
        issueOpenDate: new Date(formData.issueOpenDate).toISOString(),
        issueCloseDate: new Date(formData.issueCloseDate).toISOString(),
        listingDate: new Date(formData.listingDate).toISOString(),
        priceRange: {
          min: Number(formData.priceRange.min),
          max: Number(formData.priceRange.max),
        },
      };

      const res = await updateIpo(id, payload);
      setIpo(res.data.data);
      setFormData(res.data.data);
      setEditMode(false);
      showSnackbar("IPO updated successfully", "success");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update IPO";
      showSnackbar(errorMsg, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteIpo(id);
      showSnackbar("IPO deleted successfully", "success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete IPO";
      showSnackbar(errorMsg, "error");
    } finally {
      setSaving(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleStatusUpdate = async () => {
    setSaving(true);
    try {
      const res = await updateIpoStatus(id, selectedStatus);
      setIpo(res.data.data);
      setFormData(res.data.data);
      setStatusDialogOpen(false);
      setSelectedStatus("");
      showSnackbar("IPO status updated successfully", "success");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update status";
      showSnackbar(errorMsg, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ipo) return null;

  const statusOptions = ["UPCOMING", "OPEN", "CLOSED", "ALLOTED", "LISTED", "CANCELLED"];
  const statusColors = {
    UPCOMING: "#FFC107",
    OPEN: "#4CAF50",
    CLOSED: "#F44336",
    ALLOTED: "#FF9800",
    LISTED: "#2196F3",
    CANCELLED: "#9E9E9E",
  };

  return (
    <>
      <AppBar />
      <Box sx={{ mx: "auto", mt: 6, px: 2, maxWidth: 900 }}>
        <Card>
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
                  sx={{ flex: 1, mr: 2 }}
                />
              ) : (
                <Typography variant="h6" fontWeight={700}>
                  {ipo.companyName}
                </Typography>
              )}

              <Chip
                label={editMode ? formData.status : ipo.status}
                sx={{
                  backgroundColor: statusColors[ipo.status] || "#9e9e9e",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Details */}
            {editMode ? (
              <>
                <TextField
                  label="Issue Open Date"
                  name="issueOpenDate"
                  type="datetime-local"
                  value={formData.issueOpenDate ? new Date(formData.issueOpenDate).toISOString().slice(0, 16) : ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Issue Close Date"
                  name="issueCloseDate"
                  type="datetime-local"
                  value={formData.issueCloseDate ? new Date(formData.issueCloseDate).toISOString().slice(0, 16) : ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Listing Date"
                  name="listingDate"
                  type="datetime-local"
                  value={formData.listingDate ? new Date(formData.listingDate).toISOString().slice(0, 16) : ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    label="Price Min"
                    type="number"
                    value={formData.priceRange.min}
                    onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    label="Price Max"
                    type="number"
                    value={formData.priceRange.max}
                    onChange={(e) => handlePriceRangeChange("max", e.target.value)}
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
                  sx={{ mb: 2 }}
                />

                <TextField
                  select
                  label="Security Type"
                  name="securityType"
                  value={formData.securityType}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="equity">Equity</MenuItem>
                  <MenuItem value="debt">Debt</MenuItem>
                </TextField>
              </>
            ) : (
              <>
                <InfoRow
                  label="Security Type"
                  value={ipo.securityType?.toUpperCase() || "N/A"}
                />
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
                <InfoRow
                  label="Active Status"
                  value={ipo.isActive ? "Active" : "Inactive"}
                />
              </>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {editMode ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setFormData(ipo);
                      setEditMode(false);
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setEditMode(true)}
                  >
                    Edit IPO
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setSelectedStatus(ipo.status);
                      setStatusDialogOpen(true);
                    }}
                  >
                    Update Status
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete IPO
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate("/dashboard")}
                  >
                    Back to Dashboard
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete IPO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{ipo.companyName}"? This action
            cannot be undone. Only UPCOMING or CANCELLED IPOs can be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" disabled={saving}>
            {saving ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
      >
        <DialogTitle>Update IPO Status</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Select the new status for "{ipo.companyName}":
          </DialogContentText>
          <TextField
            select
            label="Status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            fullWidth
            size="small"
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            disabled={saving || !selectedStatus}
          >
            {saving ? "Updating..." : "Update Status"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
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

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });