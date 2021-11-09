import React,{Fragment, useEffect} from 'react';
import Sidebar from './SideBar.js';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/actions/product.action";
import { getAllOrder } from "../../redux/actions/order.action";
import { getAllUsers } from "../../redux/actions/user.action";
import './style.css';

function Dashboard() {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);
    
    
    let outOfStock = 0;
    let totalAmount = 0;

    products &&
    products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    });

    orders &&
    orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrder());
        dispatch(getAllUsers());
    }, [dispatch]);

    

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
                data: [outOfStock, products.length - outOfStock],
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
                                Total Amount <br /> ₹{totalAmount}
                            </p>
                        </div>
                        <div className="dashboard_summary_box2">
                            <Link to="/">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>

                    <div className="lineChart">
                        <Line data={lineState} />
                    </div>

                    <div className="doughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>
            </div>
        </div>
    )
}

export default Dashboard
