const express = require('express');
const app = express();

// Enable JSON parsing
app.use(express.json());

// Add config.json route
app.get('/config.json', (req, res) => {
  res.json({
    workflowApiVersion: '1.1',
    metaData: {
      icon: 'images/icon.png',
      category: 'message'
    },
    type: 'REST',
    lang: {
      'en-US': {
        name: 'SMS Custom Activity',
        description: 'A custom SMS activity'
      }
    },
    arguments: {
      execute: {
        inArguments: [],
        outArguments: [],
        url: 'https://demosmscustom-3a3ca3cd2daa.herokuapp.com/execute'
      }
    }
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Add your other routes here
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('SMS Custom Activity backend is now running!');
});
