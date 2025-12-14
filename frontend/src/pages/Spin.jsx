import { useParams } from "react-router-dom";
import { Container, Typography, Button, Paper, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import SpinWheel from "../components/SpinWheel";

const API = import.meta.env.VITE_API_URL;


export default function Spin() {
  const { token } = useParams();

  const [offers, setOffers] = useState([]);
  const [winningOffer, setWinningOffer] = useState(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/campaign/${token}`)
      .then((res) => {
        setOffers(res.data.offers.map((o) => ({ option: o })));
        setLoading(false);
      })
      .catch(() => {
        alert("Invalid or expired link");
        setLoading(false);
      });
  }, [token]);

  const spinWheel = async () => {
    try {
      const response = await axios.post(
        `${API}/spin/${token}`,
        {},
        { withCredentials: true }
      );
      setWinningOffer(response.data.result);
    } catch {
      alert("You already spun or link expired");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, mt: 6, textAlign: "center" }}>
          <Typography>Loading...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          🎉 Spin & Win
        </Typography>

        <Box display="flex" justifyContent="center" mt={4}>
          <SpinWheel
            offers={offers}
            winningOffer={winningOffer}
            onStop={() => setFinished(true)}
          />
        </Box>

        {!winningOffer && (
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={spinWheel}
          >
            Spin Now
          </Button>
        )}

        {finished && (
          <Typography variant="h5" sx={{ mt: 4 }}>
            🎊 Congratulations! You won: {winningOffer}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
