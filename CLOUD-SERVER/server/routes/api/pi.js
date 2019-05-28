const router = require('express').Router();

router.post('/on', (req, res) => {
  res.send('PI TURNED ON');
});

router.post('off', (req, res) => {
  res.send('PI TURNED ON');
});

router.get('/', (req, res) => {
  res.send('PI IS CURRENTLY TURNED ON');
});

module.exports = router;
