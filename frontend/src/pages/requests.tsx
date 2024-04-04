import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { NavDrawer } from "../components/drawer";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const Requests = (): JSX.Element => {
  const [search, setSearch] = useState("");
  return (
    <Box display="flex">
      <NavDrawer />

      <Box marginLeft="210px" marginTop="20px">
        <Typography variant="h6" fontWeight="800" color="black">
          Requests
        </Typography>

        <TextField
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: "70vw",marginTop:"20px" }}
          placeholder="Search for patients."
          InputProps={{
            sx: { borderRadius: "50px", backgroundColor: "white" },
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};
