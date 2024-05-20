import React from "react";
import { Box, CircularProgress, Grid, Paper, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export const CodeList: React.FC<{
  loading: boolean;
  rows: any;
  selectedSample?: any;
  handleSampleChange: (e: any, v: any) => void;
}> = ({ loading, rows, handleSampleChange, selectedSample }) => {
  return (
    <Paper elevation={0}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              disablePortal
              loading={loading}
              id="combo-box-demo"
              onChange={handleSampleChange}
              options={rows}
              value={selectedSample}
              sx={{ width: "100%" }}
              getOptionLabel={(option: { id: string }) => option.id}
              renderInput={(params) => (
                <TextField {...params} label="Choose A Code Sample" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
