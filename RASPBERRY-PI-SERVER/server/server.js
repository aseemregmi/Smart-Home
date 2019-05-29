const app = require('express')();
const rpio = require('rpio');

const port = process.env.PORT || 3000;
rpio.open(7, rpio.OUTPUT, rpio.LOW);

app.post('/on', (req, res) => {
console.log('Request to on received');
  res.send('PIN On');
        rpio.write(7, rpio.HIGH);
});

app.post('/off', (req, res) => {
console.log('Request to off received');
        rpio.write(7, rpio.LOW);
  res.send('PIN Off');
});

app.get('/', (req, res) => {
	res.send(rpio.read(7));
  // Fetch Current Status
});

app.listen(port, () => console.log(`Listening in PORT ${port}`));
