const fs = require('fs');
const path = require('path');
const fetchGoldPrice = require('../utils/goldPriceFetcher');




exports.getProducts = async (req, res) => {
  console.log('Sort param:', req.query.sort);
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
    const { minPrice, maxPrice, minScore, maxScore, sort } = req.query;
    if (minPrice) {
      if (isNaN(minPrice)) return res.status(400).json({ error: 'minPrice must be a number.' });
      productsWithPrice = productsWithPrice.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      if (isNaN(maxPrice)) return res.status(400).json({ error: 'maxPrice must be a number.' });
      productsWithPrice = productsWithPrice.filter(p => p.price <= Number(maxPrice));
    }
    if (minScore) {
      if (isNaN(minScore)) return res.status(400).json({ error: 'minScore must be a number.' });
      productsWithPrice = productsWithPrice.filter(p => (p.popularityScore * 5).toFixed(1) >= Number(minScore));
    }
    if (maxScore) {
      if (isNaN(maxScore)) return res.status(400).json({ error: 'maxScore must be a number.' });
      productsWithPrice = productsWithPrice.filter(p => (p.popularityScore * 5).toFixed(1) <= Number(maxScore));
    }

    // 1. Tüm değerleri number'a çevir
    productsWithPrice = productsWithPrice.map(product => ({
      ...product,
      popularityScore: Number(product.popularityScore),
      price: Number(product.price)
    }));

    // 2. Sıralama işlemini yap
    console.log('Sıralama öncesi fiyatlar:', productsWithPrice.map(p => p.price));
    const sortOption = sort || 'price-asc'; // Eğer sort gelmezse 'price-asc' uygula
    if (sort) {
      if (sort === 'price-asc') productsWithPrice.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') productsWithPrice.sort((a, b) => b.price - a.price);
      else if (sort === 'rating-desc') productsWithPrice.sort((a, b) => b.popularityScore - a.popularityScore);
      else if (sort === 'rating-asc') productsWithPrice.sort((a, b) => a.popularityScore - b.popularityScore);
    }
    console.log('Sıralama sonrası fiyatlar:', productsWithPrice.map(p => p.price));

   
    res.json(productsWithPrice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unknown error has been occurred.' });
  }
}; 