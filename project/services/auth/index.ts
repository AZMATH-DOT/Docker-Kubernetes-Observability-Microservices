import express from 'express';
const app = express();
const port = 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date(), service: 'auth-service' });
});

app.post('/login', (req, res) => {
  // Simulated JWT logic
  res.json({ token: 'eyJhbGciOiJIUzI1NiIsIn...' });
});

app.listen(port, () => {
  console.log(`Auth service listening at http://localhost:${port}`);
});
