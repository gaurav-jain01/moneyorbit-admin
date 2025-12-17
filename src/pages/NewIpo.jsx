import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../components/layout/appBar";
import ButtonComponent from "../components/ui/button";
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
    priceRange: {
      min: "",
      max: ""
    },
    isActive: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "min" || name === "max") {
      setFormData((prev) => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
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

  console.log("FINAL PAYLOAD", payload);

  // basic validation
  if (payload.priceRange.min > payload.priceRange.max) {
    alert("Min price cannot be greater than Max price");
    setLoading(false);
    return;
  }

  try {
    await createIpo(payload);
    alert("IPO created successfully ✅");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Failed to create IPO ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <ButtonAppBar />

      <div className="mainContainer pt-4 px-4 md:px-20 md:pt-8">
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl font-bold">Launch New IPO</h1>

          <ButtonComponent
            variant="contained"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </ButtonComponent>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <select
            name="securityType"
            value={formData.securityType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="equity">Equity</option>
            <option value="debt">Debt</option>
          </select>

          <input
            type="number"
            name="issuePrice"
            placeholder="Issue Price"
            value={formData.issuePrice}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-4">
            <input
              type="number"
              name="min"
              placeholder="Min Price"
              value={formData.priceRange.min}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="max"
              placeholder="Max Price"
              value={formData.priceRange.max}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <input
            type="datetime-local"
            name="issueOpenDate"
            value={formData.issueOpenDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="datetime-local"
            name="issueCloseDate"
            value={formData.issueCloseDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="datetime-local"
            name="listingDate"
            value={formData.listingDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            IPO Active
          </label>

          <ButtonComponent
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create IPO"}
          </ButtonComponent>
        </form>
      </div>
    </>
  );
}

export default NewIpo;
