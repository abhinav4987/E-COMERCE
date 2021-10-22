import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Dashboard/SideBar"
import {deleteOrder, getAllOrder} from '../../redux/actions/order.action';

function OrderList({history}) {
    const dispatch = useDispatch();
    
    const { orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.4,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteOrderHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
    ];

    const rows = [];
    
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };
    
    orders &&
    orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    useEffect(() => {
        dispatch(getAllOrder());
    },[dispatch])

    return (
        <Fragment>
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                <h1 id="productListHeading">ALL ORDERS</h1>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
                </div>
            </div>
        </Fragment>
    )
}

export default OrderList
