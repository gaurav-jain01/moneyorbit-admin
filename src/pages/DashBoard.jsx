import React, { useEffect } from 'react'
import ButtonAppBar from '../components/layout/appBar';
import DashboardIpoCard from '../components/layout/dashboardIpoCard';
import ButtonComponent from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Button
} from "@mui/material";



function Dashboard(){
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) window.location.href = "/";
        }, []);

    return(
        <>
        <ButtonAppBar/>
        <div className="mainContainer pt-4 px-4 md:px-20 md:pt-8 ">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">IPO Management</h1>
                </div>
                <br/>
                
                <DashboardIpoCard/>
                <Button variant="contained" onClick={() => navigate('/ipo/new')}>Launch New IPO</Button>
            </div>
        </div>
        </>
    )
}

export default Dashboard;