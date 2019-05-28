const app = require('express')();

const port = process.env.PORT || 3000;

app.post('/on', (req, res) => {
  res.send('PIN On');
});

app.post('/off', (req, res) => {
  res.send('PIN Off');
});

app.get('/', (req, res) => {
  // Fetch Current Status
});

app.listen(port, () => console.log(`Listening in PORT ${port}`));
