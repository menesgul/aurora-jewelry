require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const productsRoute = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

// CORS
app.use(cors({
  origin:  [ 
    'https://aurora-jewelry-eight.vercel.app', // vercel prod domainim.
    'http://localhost:3000' // localde güncelleme icin dursun. 
  ]
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // 15 dakikada 100 istek
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Aurora Jewelry API çalışıyor!');
});

app.use('/api/products', productsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
