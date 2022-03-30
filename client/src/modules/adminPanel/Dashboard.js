import React from "react";
import { Grid } from "@material-ui/core";
const Dashboard = () => {
    return (
        <div>
            <div className="container ">
                <h3 className="mt-2"><b>Dashboard</b></h3>
                <div className="row">
                    <div className="col-md-4 pt-5 ">
                        <div className="card">
                            <div className="container">
                                <h4><b>Active Users</b></h4>
                                <p>Interior Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 pt-5">
                        <div className="card">
                            <div className="container">
                                <h4><b>Total Orders</b></h4>
                                <p>Interior Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 pt-5">
                        <div className="card">
                            <div className="container">
                                <h4><b>Total sells</b></h4>
                                <p>Interior Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
