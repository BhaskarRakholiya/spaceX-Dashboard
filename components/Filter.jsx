import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { SELECT_OPTIONS } from "../utils/constants";

export default function BasicSelect({ selectedItem, handleChange }) {
  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Launch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedItem}
          label="Launch"
          onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem value={SELECT_OPTIONS.ALL}>All Launches</MenuItem>
          <MenuItem value={SELECT_OPTIONS.UPCOMING}>Upcoming Launches</MenuItem>
          <MenuItem value={SELECT_OPTIONS.SUCCESSFUL}>
            Successful Launches
          </MenuItem>
          <MenuItem value={SELECT_OPTIONS.FAILED}>Failed Launches</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
