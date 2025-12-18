import { useEffect, useState } from "react";
import IpoCard from "../components/ui/ipoCard";
import { getAllIpo } from "../features/auth/api/ipo.api";
import  AppBar from "../components/layout/appBar";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ui/button";
import { minHeight } from "@mui/system";




export default function ViewAllIpos() {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIpos = async () => {
      try {
        const response = await getAllIpo();
        setIpos(response.data.data);
      } catch (err) {
        console.error("Failed to load IPOs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIpos();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading IPOs...</p>;

  return (
    <>
    <AppBar/>
    <div className="px-6 py-6">
      <div className="flex justify-between px-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        All IPOs 
      </h1>
       <ButtonComponent
          variant="outlined"
          onClick={() => navigate("/dashboard")}
          sx={{ minWidth: '10px', maxHeight: '40px' }}
        >
          Back to Dashboard
      </ButtonComponent>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {ipos.length > 0 ? (
          ipos.map((ipo) => (
            <IpoCard key={ipo._id} ipo={ipo} />
          ))
        ) : (
          <p>No IPOs found</p>
        )}
      </div>
    </div>
    </>
  );
}
