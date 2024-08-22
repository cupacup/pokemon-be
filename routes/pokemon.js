const express = require('express');
const router = express.Router();

const isPrime = (num) => {
  for(let i = 2; i <= Math.sqrt(num); i++)
    if(num % i === 0) return false; 
  return num > 1;
};

let fibonacciCache = {};
const fibonacci = (n) => {
  if (n in fibonacciCache) return fibonacciCache[n];
  if (n <= 1) return n;
  return fibonacciCache[n] = fibonacci(n - 1) + fibonacci(n - 2);
};

router.get('/catch-probability', (req, res) => {
  const success = Math.random() > 0.5;
  res.json({ success });
});

router.post('/release', (req, res) => {
  const number = Math.floor(Math.random() * 100);
  res.json({ success: isPrime(number), number });
});

router.post('/rename', (req, res) => {
  const { nickname, renameCount } = req.body;
  res.json({ newName: `${nickname}-${fibonacci(renameCount)}` });
});

module.exports = router;
