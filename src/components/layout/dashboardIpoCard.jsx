import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IpoCard from "../ui/ipoCard";
import { getAllIpo } from "../../features/auth/api/ipo.api";
import { Button } from "@mui/material";

export default function DashboardIpoCard() {
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

  if (loading) return <p>Loading ....</p>;

  return (
    <>
      <div className="ipoMain flex flex-wrap justify-center gap-8">
        {Array.isArray(ipos) && ipos.length > 0 ? (
          ipos.slice(0, 3).map((ipo) => (
            <IpoCard key={ipo._id} ipo={ipo} />
          ))
        ) : (
          <p>No IPOs available</p>
        )}
      </div>

      {ipos.length > 3 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/ipos")}
          >
            View All IPOs
          </Button>
        </div>
      )}
    </>
  );
}
