import React,{Fragment, uaseEffect} from 'react';
import Sidebar from './SideBar.js';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import './style.css';

function Dashboard() {
    const dispatch = useDispatch();

    let outOfStock = 0;
    let totalAmount = 0;
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };
    
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                // data: [outOfStock, products.length - outOfStock],
            },
        ],
    };



    return (
        <div  className="dashboard">
            
            
            <Sidebar />
            
            <div className="dashboard_main">
                <Typography component="h1">DashBoard</Typography>
                    <div className="dashboard_summary">
                        <div>
                            <p>
                                Total Amount <br /> ₹1,436
                            </p>
                        </div>
                        <div className="dashboard_summary_box2">
                            <Link to="/">
                                <p>Product</p>
                                <p>12,345</p>
                            </Link>
                            <Link to="/">
                                <p>Orders</p>
                                <p>12,122</p>
                            </Link>
                            <Link to="/">
                                <p>Users</p>
                                <p>12,122</p>
                            </Link>
                        </div>
                    </div>

                    <div className="lineChart">

                    </div>

                    <div className="doughnutChart">

                    </div>
            </div>
        </div>
    )
}

export default Dashboard
