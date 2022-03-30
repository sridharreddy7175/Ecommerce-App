import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import image from "./1.png";
import { useStyles } from "../HeaderStyles";
import { connect } from "react-redux";
import { signoutUser } from "../../../../redux/modules/signin/signin_actions";
import { useHistory } from "react-router-dom";


function Profile(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropDownData = [
    { label: "settings", icon: <SettingsIcon /> },
    { label: "Logout", icon: <ExitToAppIcon /> },
  ];

  const signOut = () => {
    props.signoutUser();
    history.push("/");
  }


  return (
    <Box>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        startIcon={
          <Avatar src={image} className={classes.navAvatar}></Avatar>
        }></Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {dropDownData.map((item, i) => (
          <MenuItem key={i} component={ListItem} onClick={handleClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText onClick={signOut}>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
export default connect(
  (state) => ({
    details: state.user,
  }),

  { signoutUser }
)(Profile);