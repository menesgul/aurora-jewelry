const fs = require('fs');
const path = require('path');
const fetchGoldPrice = require('../utils/goldPriceFetcher');




exports.getProducts = async (req, res) => {

  const productsPath = path.join(__dirname, '../products.json');
  try {
    if (!fs.existsSync(productsPath)) {
      return res.status(500).json({ error: 'Product data file not found.' });
    }
    const data = fs.readFileSync(productsPath, 'utf8');
    let products;
    try {
      products = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: 'Product data is not readable or corrupted.' });
    }

    let goldPrice;
    try {
      goldPrice = await fetchGoldPrice();
    } catch (goldErr) {
      return res.status(503).json({ error: 'Live gold price could not be fetched. Please try again later.' });
    }

    // Fiyatı hesaplama yapılıyor ve yeni dizi oluşturuluyor burada.
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

    // gerek yok aslında -sadece tedbir amaçlı number olduğunu declare etmek için-
    productsWithPrice = productsWithPrice.map(product => ({
      ...product,
      popularityScore: Number(product.popularityScore),
      price: Number(product.price)
    }));

    //  Sıralama işlemini yapıyoruz burada.
    
    if (sort) {
      if (sort === 'price-asc') productsWithPrice.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') productsWithPrice.sort((a, b) => b.price - a.price);
      else if (sort === 'rating-desc') productsWithPrice.sort((a, b) => b.popularityScore - a.popularityScore);
      else if (sort === 'rating-asc') productsWithPrice.sort((a, b) => a.popularityScore - b.popularityScore);
    }
    
   
    res.json(productsWithPrice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unknown error has been occurred.' });
  }
}; 