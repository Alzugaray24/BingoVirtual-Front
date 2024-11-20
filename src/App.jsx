// src/App.js
import { CssBaseline, Box, Container } from "@mui/material";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Container maxWidth="m">
          <AppRouter />
        </Container>
      </Box>
    </>
  );
}

export default App;
