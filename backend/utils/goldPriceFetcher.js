const axios = require('axios');

const GOLD_API_KEY = process.env.GOLD_API_KEY;
const GOLD_API_URL = 'https://www.goldapi.io/api/XAU/USD';

async function fetchGoldPrice() {
  try {
    const response = await axios.get(GOLD_API_URL, {
      headers: {
        'x-access-token': GOLD_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    // GoldAPI'den dönen fiyat bilgisi -24k ayarındaki gram altının fiyatı !!-
    return response.data.price_gram_24k;
  } catch (error) {
    console.error('Gold price could not be fetched:', error.message);
    throw new Error('Gold price could not be fetched');
  }
}

module.exports = fetchGoldPrice; 