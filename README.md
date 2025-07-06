# 💍 Aurora Jewelry – Full-Stack Developer Internship Study Case

Bu depo, **Full-Stack Developer Internship Study Case** kapsamında oluşturulmuş tam kapsamlı bir ürün listeleme uygulamasını içerir. Uygulama, **sadece verilen 4 kaynak dosyaya** tamamen sadık kalınarak hazırlanmıştır:

📦 **Kullanılan Veri & Tasarım Kaynakları:**
1. `products.json`
2. `Assignment Brief for Full-Stack Developer Role.pdf`
3. `page design.pdf`
4. `Fonts` (Avenir & Montserrat)

Tüm kararlar, uygulama ve tasarım %100 bu dosyalara dayalıdır.

---
## 🌐 Canlı Demo

- 🖥️ Frontend: [https://aurora-jewelry.vercel.app](https://aurora-jewelry.vercel.app)
- ⚙️ Backend API: [https://aurora-jewelry-api.render.com/api/products](https://aurora-jewelry-api.render.com/api/products)

---





## 📂 Proje Yapısı

/backend # Aurora Jewelry REST API (Node.js + Express)
├── server.js
├── routes/products.js
├── controllers/productController.js
├── utils/goldPriceFetcher.js
├── data/products.json # Tüm ürün verisinin kaynağı
/frontend # Aurora Jewelry UI (Next.js + TailwindCSS)
├── pages/index.js
├── components/ProductCard.jsx
├── components/Carousel.jsx
├── components/ColorPicker.jsx
├── styles/globals.css
├── public/fonts/Avenir.ttf
├── public/fonts/Montserrat.ttf

---

## 🚀 Özellikler
### 🔥 Backend (Node.js + Express)
- **RESTful API**: Ürün verisini doğrudan `products.json` üzerinden sunar.
- **Dinamik fiyat hesaplama**:
  Fiyat = (popularityScore + 1) * weight * goldPrice
- Altın fiyatı canlı olarak [GoldAPI](https://www.goldapi.io) üzerinden çekilir (ücretsiz API anahtarı gerektirir).
- **Filtreleme API'si**:
  - Sorgu parametreleri:
    - `minPrice`
    - `maxPrice`
    - `minScore`
    - `maxScore`
  - Örnek:
    ```
    GET /api/products?minPrice=500&maxPrice=2000&minScore=3.5
    ```
  - API URL: `https://aurora-jewelry-api.render.com/api/products`

---

### ✨ Frontend (Next.js + TailwindCSS)
- **Tasarım PDF'ine %100 sadık, tamamen responsive UI**:
  - Renkler: `#E6CA97` (Yellow Gold), `#D9D9D9` (White Gold), `#E1A4A9` (Rose Gold)
  - Fontlar: **Avenir** ve **Montserrat**
  - Font ağırlıkları, boyutları, margin ve padding'ler birebir uyumlu
  - Hover efektleri ve etkileşimler tasarımla aynı
- Özellikler:
  - Ürün adı, dinamik fiyat (USD)
  - Renk seçici (görseli anlık değiştirir)
  - Popülarite puanı (5 üzerinden, 1 ondalık)
  - Carousel:
    - Masaüstü: yan oklar
    - Mobil: swipe hareketleri
  - Mobile-first yaklaşım: Tüm ekran boyutlarında kusursuz çalışır.

---




## 📱 Ekran Görüntüleri

### 🖥️ Masaüstü (1920px genişlik)
- Tam genişlikte grid düzeni, birebir spacing
- Buton ve renk swatch'larında hover efektleri
- Carousel oklarla gezilebilir

### 📱 Tablet (768px genişlik)
- 2 kolonlu responsive grid
- Carousel için dokunmatik swipe desteği
- Tipografi orta ekranlara göre ölçeklenir

### 📱 Mobil (375px genişlik)
- Tek kolonlu layout
- Renk seçici için büyük dokunmatik alanlar
- Carousel için swipe hareketleri
- iOS ve Android cihazlara tam uyum

### 🎨 Tasarım Uyumu
> Tüm detaylar **page design.pdf**'ten birebir alınmıştır:
> 
> ✅ Tam renk paleti  
> ✅ Tam font ve tipografi  
> ✅ Piksel hassasiyetinde spacing ve hizalama  
> ✅ Etkileşimli bileşenler (hover, swipe, carousel)  
> ✅ Tamamen responsive layout

---

## 📦 Teknoloji Yığını

| Katman       | Teknoloji                    | Neden?                              |
|--------------|-----------------------------|-------------------------------------|
| Veri Kaynağı | **products.json**           | Statik JSON dosyası (verilen kaynak)|
| Backend      | Node.js + Express           | Hızlı, minimal REST API             |
| Canlı API    | GoldAPI                     | Canlı altın fiyatı çekimi           |
| Frontend     | Next.js + TailwindCSS       | React tabanlı, SEO dostu            |
| Carousel     | Swiper.js                   | Mobil & masaüstü desteği            |
| Fontlar      | Avenir, Montserrat          | Tasarım PDF ile birebir uyumlu      |
| Dağıtım      | Vercel (Frontend), Render (Backend) | Ücretsiz & hızlı hosting   |

---

## 📥 Kurulum

### Repo Klonlama
```bash
git clone https://github.com/<your-username>/aurora-jewelry.git
cd aurora-jewelry
```
________________________________________
**Backend Kurulumu**
```bash
cd backend
npm install
node server.js
```
Çalışma adresi: http://localhost:5000
________________________________________
**Frontend Kurulumu**
```bash
cd frontend
npm install
npm run dev
```
Çalışma adresi: http://localhost:3000
________________________________________

🌍 **API Endpointleri**
| Yöntem | Endpoint | Açıklama |
|--------|----------|----------|
| GET    | /api/products | Tüm ürünleri döner |
| GET    | /api/products?minPrice=100&maxPrice=500 | Fiyat aralığına göre filtreler |
| GET    | /api/products?minScore=4.0 | Popülariteye göre filtreler |

________________________________________

🌐 **Dağıtım**
| Katman   | Platform | URL |
|----------|----------|-----|
| Backend  | Render   | https://aurora-jewelry-api.render.com |
| Frontend | Vercel   | https://aurora-jewelry.vercel.app |

________________________________________

👨‍💻 **Author**
•
• 