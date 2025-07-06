const express = require('express');
const cors = require('cors');
const productsRoute = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Aurora Jewelry API çalışıyor!');
});

app.use('/api/products', productsRoute);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
