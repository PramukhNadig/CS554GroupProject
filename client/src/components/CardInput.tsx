/** @format */

import { TextField, Button, Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField label='Term' variant='outlined' sx={{ flex: 1 }} />
      <TextField label='Definition' variant='outlined' sx={{ flex: 1 }} />
      <input
        type='file'
        style={{
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
        }}
      />
    </Box>
  );
}

export default App;
