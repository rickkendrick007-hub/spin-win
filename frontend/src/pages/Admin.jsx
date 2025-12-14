import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [offers, setOffers] = useState("");
  const [maxSpins, setMaxSpins] = useState(1);
  const [link, setLink] = useState("");

  const createCampaign = async () => {
    const response = await axios.post(`${API}/admin/campaign`, {
      offers: offers.split(",").map((o) => o.trim()),
      max_spins: Number(maxSpins),
    });
    setLink(response.data.link);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Admin Panel
        </Typography>

        <TextField
          label="Offers (comma separated)"
          fullWidth
          margin="normal"
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
        />

        <TextField
          label="Max Users"
          type="number"
          fullWidth
          margin="normal"
          value={maxSpins}
          onChange={(e) => setMaxSpins(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={createCampaign}
        >
          Generate Link
        </Button>

        {link && (
          <Box mt={3}>
            <Typography variant="subtitle1">Campaign Link:</Typography>
            <Typography color="primary">{link}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
