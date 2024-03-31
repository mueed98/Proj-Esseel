import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { NavDrawer } from "../components/drawer";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const DrPortal = (): JSX.Element => {
  const [selected, setSelected] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex">
      <NavDrawer />

      <Box marginLeft="210px" marginTop="20px">
        <Typography variant="h6" fontWeight="800" color="black">
          Dashboard
        </Typography>

        <Box display="flex" marginTop="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="225px"
            padding="24px"
            sx={{ backgroundColor: "white", borderRadius: "10px" }}
            marginRight="20px"
          >
            <Box>
              <Typography variant="body2">Patients</Typography>
              <Typography variant="h6" fontWeight="800">
                666
              </Typography>
            </Box>

            <i
              className="fas fa-user-md"
              style={{ fontSize: "24px", color: "purple" }}
            ></i>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="225px"
            padding="24px"
            sx={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <Box>
              <Typography>Treatments</Typography>
              <Typography>402</Typography>
            </Box>

            <i
              className="fas fa-heartbeat"
              style={{ fontSize: "24px", color: "green" }}
            ></i>
          </Box>
        </Box>

        <Box display="flex" marginTop="20px">
          <Box
            display="flex"
            flexDirection="column"
            // justifyContent="space-between"
            // alignItems="center"
            width="520px"
            padding="24px"
            sx={{ backgroundColor: "white", borderRadius: "10px" }}
            marginRight="20px"
          >
            <Typography variant="h6" fontWeight="800">
              Today's Appointments
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              padding="20px"
              width="483px"
              justifyContent="space-between"
              marginTop="20px"
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(249 250 251)",
                },
                borderRadius: "10px",
              }}
            >
              <Box display="flex">
                <Avatar
                  sx={{ height: "54px", width: "54px", marginRight: "10px" }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="800">
                    Aisha
                  </Typography>
                  <Typography variant="body2">Check-up</Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="darkblue" fontWeight="800">
                On Going
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            width="520px"
            padding="24px"
            sx={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="800">
                My Patient
              </Typography>

              <div>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  size="small"
                >
                  <MoreVertIcon fontSize="inherit" />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </Box>

            <Divider
              orientation="horizontal"
              sx={{ width: "100%", marginTop: "10px" }}
            />

            <Box
              display="flex"
              flexDirection="column"
              marginTop="20px"
        
            >
              <Typography variant="body1" fontWeight="600">
                John Doe
              </Typography>
              <Typography variant="body2">johndoe@example.com</Typography>
              <Typography variant="body2">(123) 456-7890</Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="10px"
              >
                <Box display="flex" alignItems="center">
                  <i className="fas fa-file-pdf mr-2"></i>
                  <Typography marginLeft="5px">Medical Detail</Typography>
                </Box>
                <div>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    size="small"
                  >
                    <MoreVertIcon fontSize="inherit" />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
