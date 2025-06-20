import React from "react";

import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import trackmanLogoImage from "../../assets/TrackmanLogo.png";
import "./top-bar.scss";

const tabs = [
  { label: "Facilities", path: "/facilities" },
  { label: "Locations", path: "/locations" },
  { label: "Players", path: "/players" },
  { label: "Access Management", path: "/access-management" },
];

const TopBar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="fixed"
      className="app-bar"
    >
      <Toolbar
      className="top-bar">
        <Typography variant="h6" component="div" className="trackman-logo">
        <img
            src={trackmanLogoImage}
            alt="Trackman Logo"
            style={{ height: 20, verticalAlign: "middle" }}
        />
        </Typography>
        <Tabs
          sx={{ flexGrow: 1 }}
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              label={tab.label}
              component={Link}
              to={tab.path}
            ></Tab>
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
