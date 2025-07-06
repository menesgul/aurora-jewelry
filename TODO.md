# ✅ Aurora Jewelry – Yapılacaklar Listesi

## 1. Proje Kurulumu ve Dosya Yapısı
- [x] `backend` ve `frontend` klasörlerini oluştur
- [x] `backend/products.json` dosyasını ekle
- [x] Backend için temel klasörleri oluştur (`routes`, `controllers`, `utils`)
- [x] `backend/server.js` dosyasını oluştur ve Express sunucusunu başlat
- [x] `package.json` oluştur ve gerekli bağımlılıkları yükle (`express`, `cors`, `axios`)
- [x] `/api/products` endpointini oluştur (şimdilik sadece products.json'u döndürüyor)

## 2. Backend Geliştirme
- [x] GoldAPI ile canlı altın fiyatı çeken yardımcı fonksiyonu yaz (`utils/goldPriceFetcher.js`)
- [x] Ürünlerin fiyatını dinamik olarak hesapla (popularityScore, weight, goldPrice)
- [x] `/api/products` endpointinde fiyatı hesaplanmış şekilde ürünleri döndür
- [x] Filtreleme desteği ekle (minPrice, maxPrice, minScore, maxScore)
- [x] Hatalı istekler ve hata yönetimi için uygun yanıtlar ekle

## 3. Frontend Geliştirme
- [ ] Next.js + TailwindCSS ile frontend başlat
- [ ] Tasarıma %100 sadık ana ürün listeleme sayfası oluştur
- [ ] API'den ürünleri çek ve ekranda göster
- [ ] Renk seçici (color picker) ile ürün görselini değiştir
- [ ] Popülarite puanını 5 üzerinden, 1 ondalık göster
- [ ] Carousel (Swiper.js) ile ürünler arasında gezinme
- [ ] Responsive ve mobil uyumlu tasarım
- [ ] Hover efektleri ve interaktif detaylar
- [ ] Fontları (Avenir, Montserrat) projeye ekle

## 4. Ekstra ve Deploy
- [ ] Canlıya alma (Vercel/Render)
- [ ] README.md güncellemesi ve son kontroller 