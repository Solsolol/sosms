const express = require('express');
const app = express();

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Add your other routes here
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('SMS Custom Activity backend is now running!');
});
