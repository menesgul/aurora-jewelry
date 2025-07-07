const axios = require('axios');

const GOLD_API_KEY = process.env.GOLD_API_KEY || 'goldapi-fmousmcs33fic-io';
const GOLD_API_URL = 'https://www.goldapi.io/api/XAU/USD';

async function fetchGoldPrice() {
  try {
    const response = await axios.get(GOLD_API_URL, {
      headers: {
        'x-access-token': GOLD_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    // GoldAPI'den dönen fiyat bilgisi 'price_gram_24k' alanında
    return response.data.price_gram_24k;
  } catch (error) {
    console.error('Altın fiyatı alınamadı:', error.message);
    throw new Error('Altın fiyatı alınamadı');
  }
}

module.exports = fetchGoldPrice; 