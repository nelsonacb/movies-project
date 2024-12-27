import { Box, CircularProgress, Typography } from "@mui/material";

export const Loader = () => {
  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      <CircularProgress size={25} />
      <Typography variant="h5" component="h5" color="primary">
        Loading movies...
      </Typography>
    </Box>
  );
};
