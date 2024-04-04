import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Avatar, Box, Drawer, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import InboxIcon from "@mui/icons-material/Inbox";

export const NavDrawer = (): JSX.Element => {
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/DrPortal") {
      setSelected("dashboard");
    }else if(location?.pathname === "/MyPatients"){
        setSelected("my-patients")
    }else if(location?.pathname === "/Requests"){
        setSelected("requests")

    }
  }, [location?.pathname]);

  return (
    console.log(location?.pathname),
    
    <Drawer variant="permanent" anchor="left">
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: "147px",
          backgroundColor: "#0D47A1",
          height: "100%",
        }}
        alignItems="center"
        padding="20px"
      >
        <Avatar sx={{ height: "104px", width: "104px" }} />

        <Typography variant="h6" sx={{ color: "white" }}>
          Dr. Ahmed Ali
        </Typography>
        <Typography variant="body2" sx={{ color: "#BDBDBD" }}>
          General Practitioner
        </Typography>

        <Box marginTop="20px">
          <Box
            display="flex"
            //   justifyContent="space-evenly"
            alignItems="center"
            width="127px"
            padding="10px"
            sx={
              selected === "dashboard"
                ? {
                    backgroundColor: "#1D4ED8",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }
                : { borderRadius: "5px", cursor: "pointer" }
            }
            onClick={() => {
              navigate("/DrPortal");
              setSelected("dashboard");
            }}
          >
            <DashboardIcon
              sx={{
                height: "20px",
                width: "20px",
                marginRight: "10px",
                color: "white",
              }}
            />
            <Typography variant="body2" color="white">
              Dashboard
            </Typography>
          </Box>

          <Box
            display="flex"
            //   justifyContent="space-evenly"
            alignItems="center"
            width="127px"
            padding="10px"
            sx={
              selected === "my-patients"
                ? {
                    backgroundColor: "#1D4ED8",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }
                : { borderRadius: "5px", cursor: "pointer" }
            }
            onClick={() => {
              navigate("/MyPatients");
              setSelected("my-patients");
            }}
          >
            <GroupIcon
              sx={{
                height: "20px",
                width: "20px",
                marginRight: "10px",
                color: "white",
              }}
            />
            <Typography variant="body2" color="white">
              My Patients
            </Typography>
          </Box>

          <Box
            display="flex"
            //   justifyContent="space-evenly"
            alignItems="center"
            width="127px"
            padding="10px"
            sx={
              selected === "requests"
                ? {
                    backgroundColor: "#1D4ED8",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }
                : { borderRadius: "5px", cursor: "pointer" }
            }
            onClick={() => {
              navigate("/Requests");
              setSelected("requests");
            }}
          >
            <InboxIcon
              sx={{
                height: "20px",
                width: "20px",
                marginRight: "10px",
                color: "white",
              }}
            />
            <Typography variant="body2" color="white">
              Requests
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
