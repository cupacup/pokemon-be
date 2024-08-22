const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let caughtPokemons = [];
let renameCount = {}; 
const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
};

// const fibonacci = (n) => {
//   let [a, b] = [0, 1];
//   while (n-- > 0) {
//     [a, b] = [b, a + b];
//   }
//   return a;
// };

const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };


app.post('/catch', (req, res) => {
  const { name } = req.body;
  const success = Math.random() < 0.5;

  if (success) {
    caughtPokemons.push(name);
    res.json({ success: true, message: `You caught ${name}!` });
  } else {
    res.json({ success: false, message: `Failed to catch ${name}. Try again!` });
  }
});

app.post('/release', (req, res) => {
  const { name } = req.body;
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  if (isPrime(randomNumber)) {
    caughtPokemons = caughtPokemons.filter(pokemon => pokemon !== name);
    res.json({ success: true, message: `You released ${name}!`, randomNumber });
  } else {
    res.json({ success: false, message: `Failed to release ${name}.`, randomNumber });
  }
});

app.post('/rename', (req, res) => {
    const { name, nickname } = req.body;
    if (!renameCount[name]) {
      renameCount[name] = 0;
    }
  
    const fibNumber = fibonacci(renameCount[name]);
    renameCount[name] += 1;

    const newNickname = `${nickname}-${fibNumber}`;
  
    res.json({
      success: true,
      message: `Renamed ${name} to ${newNickname}`,
      nickname: newNickname
    });
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
