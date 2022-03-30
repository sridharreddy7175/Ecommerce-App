import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { useStyles } from "./HeaderStyles";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";


export default function HeaderComponent() {
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
        <Dashboard />
      </Box>
    </div>
  );
}
