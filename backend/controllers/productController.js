const fs = require('fs');
const path = require('path');
const fetchGoldPrice = require('../utils/goldPriceFetcher');

exports.getProducts = async (req, res) => {
  const productsPath = path.join(__dirname, '../products.json');
  try {
    if (!fs.existsSync(productsPath)) {
      return res.status(500).json({ error: 'Ürün veri dosyası bulunamadı.' });
    }
    const data = fs.readFileSync(productsPath, 'utf8');
    let products;
    try {
      products = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: 'Ürün verisi okunamadı veya bozuk.' });
    }

    let goldPrice;
    try {
      goldPrice = await fetchGoldPrice();
    } catch (goldErr) {
      return res.status(503).json({ error: 'Canlı altın fiyatı alınamadı. Lütfen daha sonra tekrar deneyin.' });
    }

    // Fiyatı hesapla ve yeni bir dizi oluştur
    let productsWithPrice = products.map(product => {
      const price = ((product.popularityScore + 1) * product.weight * goldPrice).toFixed(2);
      return {
        ...product,
        price: Number(price)
      };
    });

    // Filtreleme
    const { minPrice, maxPrice, minScore, maxScore } = req.query;
    if (minPrice) {
      if (isNaN(minPrice)) return res.status(400).json({ error: 'minPrice sayısal olmalı.' });
      productsWithPrice = productsWithPrice.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      if (isNaN(maxPrice)) return res.status(400).json({ error: 'maxPrice sayısal olmalı.' });
      productsWithPrice = productsWithPrice.filter(p => p.price <= Number(maxPrice));
    }
    if (minScore) {
      if (isNaN(minScore)) return res.status(400).json({ error: 'minScore sayısal olmalı.' });
      productsWithPrice = productsWithPrice.filter(p => (p.popularityScore * 5).toFixed(1) >= Number(minScore));
    }
    if (maxScore) {
      if (isNaN(maxScore)) return res.status(400).json({ error: 'maxScore sayısal olmalı.' });
      productsWithPrice = productsWithPrice.filter(p => (p.popularityScore * 5).toFixed(1) <= Number(maxScore));
    }

    res.json(productsWithPrice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Bilinmeyen bir hata oluştu.' });
  }
}; 