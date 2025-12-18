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

      <div className="mainContainer pt-6 px-4 md:px-8 lg:px-20 md:pt-8 pb-8  mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl text-gray-700">Create New IPO</h1>

          <ButtonComponent
            variant="outlined"
            onClick={() => navigate("/dashboard")}
            sx={{ minWidth: '160px' }}
          >
            Back to Dashboard
          </ButtonComponent>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6"
        >
          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Security Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="securityType" className="text-sm font-medium text-gray-700">
              Security Type
            </label>
            <select
              id="securityType"
              name="securityType"
              value={formData.securityType}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="equity">Equity</option>
              <option value="debt">Debt</option>
            </select>
          </div>

          {/* Issue Price */}
          <div className="flex flex-col gap-2">
            <label htmlFor="issuePrice" className="text-sm font-medium text-gray-700">
              Issue Price
            </label>
            <input
              id="issuePrice"
              type="number"
              name="issuePrice"
              placeholder="Enter issue price"
              value={formData.issuePrice}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Price Range
            </label>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="minPrice" className="text-xs text-gray-600">
                  Minimum Price
                </label>
                <input
                  id="minPrice"
                  type="number"
                  name="min"
                  placeholder="Min price"
                  value={formData.priceRange.min}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="maxPrice" className="text-xs text-gray-600">
                  Maximum Price
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  name="max"
                  placeholder="Max price"
                  value={formData.priceRange.max}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Issue Open Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="issueOpenDate" className="text-sm font-medium text-gray-700">
              Issue Open Date
            </label>
            <input
              id="issueOpenDate"
              type="datetime-local"
              name="issueOpenDate"
              value={formData.issueOpenDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Issue Close Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="issueCloseDate" className="text-sm font-medium text-gray-700">
              Issue Close Date
            </label>
            <input
              id="issueCloseDate"
              type="datetime-local"
              name="issueCloseDate"
              value={formData.issueCloseDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Listing Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="listingDate" className="text-sm font-medium text-gray-700">
              Listing Date
            </label>
            <input
              id="listingDate"
              type="datetime-local"
              name="listingDate"
              value={formData.listingDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
              Mark IPO as Active
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <ButtonComponent
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ 
                minWidth: '160px',
                padding: '10px 24px',
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              {loading ? "Creating..." : "Create IPO"}
            </ButtonComponent>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewIpo;
