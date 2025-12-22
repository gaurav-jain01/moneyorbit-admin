import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../components/layout/appBar";
import ButtonComponent from "../components/ui/button";
import InputComponent from "../components/ui/input";
import { createIpo } from "../features/auth/api/ipo.api";

function NewIpo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    securityType: "equity",
    issuePrice: "",
    issueOpenDate: "",
    issueCloseDate: "",
    listingDate: "",
    priceRange: { min: "", max: "" },
    isActive: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePriceRange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (+formData.priceRange.min > +formData.priceRange.max) {
      setError("Minimum price cannot be greater than maximum price");
      return;
    }

    setLoading(true);

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

    try {
      await createIpo(payload);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create IPO");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonAppBar />

      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-3xl mx-auto p-8 rounded-xl shadow-lg flex flex-col gap-6"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Create New IPO
            </h1>

            <ButtonComponent
              variant="outlined"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </ButtonComponent>
          </div>

          {/* COMPANY NAME */}
          <InputComponent
            label="Company Name"
            value={formData.companyName}
            onChange={(v) => updateField("companyName", v)}
            placeholder="Enter company name"
            required
            small={true}
        />

          {/* SECURITY TYPE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Security Type
            </label>
            <select
              value={formData.securityType}
              onChange={(e) => updateField("securityType", e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="equity">Equity</option>
              <option value="debt">Debt</option>
            </select>
          </div>

          {/* ISSUE PRICE */}
          <InputComponent
            label="Issue Price"
            type="number"
            value={formData.issuePrice}
            onChange={(v) => updateField("issuePrice", v)}
            placeholder="Enter issue price"
            required
            small={true}
          />

          {/* PRICE RANGE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputComponent
              label="Minimum Price"
              type="number"
              value={formData.priceRange.min}
              onChange={(v) => updatePriceRange("min", v)}
              placeholder="Min price"
              required
            small={true}

            />
            <InputComponent
              label="Maximum Price"
              type="number"
              value={formData.priceRange.max}
              onChange={(v) => updatePriceRange("max", v)}
              placeholder="Max price"
              required
            small={true}

            />
          </div>

          {/* DATES */}
          <InputComponent

            type="datetime-local"
            value={formData.issueOpenDate}
            onChange={(v) => updateField("issueOpenDate", v)}
            required
            small={true}

          />

          <InputComponent
            small={true}
            type="datetime-local"
            value={formData.issueCloseDate}
            onChange={(v) => updateField("issueCloseDate", v)}
            required
          />

          <InputComponent
      
            type="datetime-local"
            value={formData.listingDate}
            onChange={(v) => updateField("listingDate", v)}
            required
          />

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => updateField("isActive", e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              Mark IPO as Active
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <div className="flex justify-end pt-4 border-t">
            <ButtonComponent type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create IPO"}
            </ButtonComponent>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewIpo;
