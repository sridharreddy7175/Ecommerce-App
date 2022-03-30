import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from '@material-ui/icons/Group';
import PostAddIcon from "@material-ui/icons/PostAdd";
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyles";

export default function SidenavData({ handleDrawerClose }) {
  const classes = useStyles();
  const listItemData = [
    { label: "Dashobard", link: "/admin/dashboard", icon: <DashboardIcon /> },
    { label: "UserList", link: "/admin/users/list", icon: <GroupIcon /> },
    { label: "Products", link: "/admin/products", icon: <PostAddIcon /> },
    {
      label: "ProductsList",
      link: "/admin/productslist",
      icon: <CategoryIcon />,
    },
    {
      label: "Category",
      link: "/admin/category",
      icon: <PostAddIcon />,
    },
    {
      label: "CategoriesList",
      link: "/admin/categorieslist",
      icon: <CategoryIcon />,
    },

    { label: "Logout", link: "/logout", icon: <ExitToAppIcon /> },
  ];
  return (
    <List>
      {listItemData.map((item, i) => (
        <Button
          size="small"
          className={classes.navButton}
          onClick={() => handleDrawerClose()}
          key={i}
        >
          <ListItem
            exact
            component={NavLink}
            to={item.link}
            className={classes.navlinks}
            activeClassName={classes.activeNavlinks}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
  );
}
