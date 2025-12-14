import { useState, useEffect } from "react";
import IpoCard from "../ui/ipoCard";
import { getAllIpo } from "../../features/auth/api/ipo.api";



export default function DashboardIpoCard(){

    const [ipos, setIpos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchIpo = async()=>{
            try{
                setLoading(true);
                const response = await getAllIpo();

                setIpos(response.data.data);
            }
            catch{
                console.log("error into ipo loading", err)
            }
            finally{
                setLoading(false);
            }
        }

        fetchIpo();
    },[])

    if(loading) return<p>Loading ....</p>


    return(
        <div className="ipoMain flex flex-wrap justify-center gap-8">
            {Array.isArray(ipos) && ipos.length > 0 ? (
            ipos.map((ipo) => <IpoCard key={ipo._id} ipo={ipo} />)
            ) : (
            <p>No IPOs available</p>
            )}
        </div>
    )
}