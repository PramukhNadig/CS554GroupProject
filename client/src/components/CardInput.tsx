/** @format */

import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import React from "react";

function App() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField label='Term' variant='outlined' sx={{ flex: 1 }} />
      <TextField label='Definition' variant='outlined' sx={{ flex: 1 }} />
      <input
        onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (!e.target.files) return;
          let imageId = axios.post("http://localhost:4000/v1/images", { image: e.target.files[0] });
          }
        }
        type='file'
        accept='image/*'
        
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
