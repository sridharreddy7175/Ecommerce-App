
import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { useStyles } from "./HeaderStyles";
import EditProduct from "../BodyComponent/EditProduct";


export default function EditProductPage() {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerOpen = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleDrawerClose = () => {
        setMobileOpen(false);
    };
    return (
        <div>
            <Box className={classes.wrapper}>
                <Navbar handleDrawerOpen={handleDrawerOpen} />
                <Sidenav
                    mobileOpen={mobileOpen}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
                <EditProduct />
            </Box>
        </div>
    );
}

