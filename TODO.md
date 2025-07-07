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
- [x] Next.js + TailwindCSS ile frontend başlat
- [x] Fontları (Avenir, Montserrat) projeye ekle
- [x] Tasarıma %100 sadık ana ürün listeleme sayfası oluştur
- [x] API'den ürünleri çek ve ekranda göster
- [x] Renk seçici (color picker) ile ürün görselini değiştir
- [x] Popülarite puanını 5 üzerinden, 1 ondalık göster
- [x] Carousel (Swiper.js) ile ürünler arasında gezinme
- [x] Responsive ve mobil uyumlu tasarım
- [x] Hover efektleri ve interaktif detaylar

## 4. Ekstra ve Deploy
- [ ] Canlıya alma (Vercel/Render)
- [ ] README.md güncellemesi ve son kontroller

## 5. Yeni Eklenen Özellikler
- [ ] 1. Ürün detay sayfası oluşturma
- [ ] 2. Sepete ekleme fonksiyonalitesi
- [ ] 3. Kullanıcı girişi ve kayıt sistemi
- [ ] 4. Favori ürünler listesi
- [ ] 5. Ürün arama özelliği
- [ ] 6. Kategori filtreleme
- [ ] 7. Sıralama seçenekleri (fiyat, popülarite, isim)
- [ ] 8. Ürün karşılaştırma özelliği
- [x] 9. Frontend'de filtreleme özelliği ekleme
- [ ] 10. Admin paneli oluşturma 