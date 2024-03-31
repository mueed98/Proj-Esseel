import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type ClientType = "Patient" | "Doctor";

export const Login = (): JSX.Element => {
  const [type, setType] = useState<ClientType>("Doctor");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="98vh"
      width="98vw"
      sx={{ backgroundColor: "#f4f4f4" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1);",
        }}
        width="195px"
        height="255px"
      >
        <Box>
          <Typography>I am a:</Typography>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as ClientType)}
            sx={{ height: "35px", width: "100%" }}
          >
            <MenuItem value={"Doctor"}>Doctor</MenuItem>
            <MenuItem value={"Patient"}>Patient</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography sx={{ paddingTop: "5px" }}>Username</Typography>
          <TextField
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
          />
        </Box>

        <Box>
          <Typography sx={{ paddingTop: "5px" }}>Password</Typography>
          <TextField
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />
        </Box>

        <Button variant="contained">Login</Button>
      </Box>
    </Box>
  );
};
