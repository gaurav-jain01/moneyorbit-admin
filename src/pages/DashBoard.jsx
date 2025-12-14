import React from 'react'
import ButtonAppBar from '../components/layout/appBar';
import DashboardIpoCard from '../components/layout/dashboardIpoCard';


function Dashboard(){
    return(
        <>
        <ButtonAppBar/>
        <div className="mainContainer pt-4 px-4 md:px-20 md:pt-8 ">
        <DashboardIpoCard/>

        </div>
        </>
    )
}

export default Dashboard;