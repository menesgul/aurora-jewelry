# Aurora Jewelry – Product Listing Application

This repository contains a full-stack product listing application developed as part of a technical assignment. The project consists of a backend RESTful API and a modern, responsive frontend, built to match a provided design and fulfill all assignment requirements.

---

## 🚀 Live Demo
- **Frontend:** [https://aurora-jewelry-eight.vercel.app](https://aurora-jewelry-eight.vercel.app)
- **Backend API:** [https://aurora-jewelry-api.render.com/api/products](https://aurora-jewelry-api.render.com/api/products)

---

## 📦 Project Structure

```
Aurora Jewelry/
  backend/           # Node.js + Express REST API
    controllers/
    routes/
    utils/
    products.json    # Product data source
    server.js
    ...
  frontend/          # Next.js + TailwindCSS UI
    src/app/
    public/
    ...
  README.md
```

---

## 📝 Assignment Brief (Summary)

**Goal:** Build a product listing app with a backend API and a frontend UI. The backend serves product data from a JSON file and calculates dynamic prices using real-time gold prices. The frontend fetches and displays products according to a provided design, with features like color picker, rating, and carousel. Filtering and sorting are bonus features.

**Backend Requirements:**
- Serve product data from a JSON file via a RESTful API
- Each product has: name, popularityScore, weight, images (3 type  colors)
- Dynamic price calculation: `(popularityScore + 1) * weight * goldPrice` (USD)
- Fetch real-time gold price from a public API (GoldAPI)
- (Bonus) Filtering by price and popularity score

**Frontend Requirements:**
- Fetch and display products from the backend
- Show product name, price, color picker (changes image), rating (out of 5, 1 decimal)
- Responsive carousel (arrows + swipe, mobile & desktop)
- Layout and style must closely match the provided design
- (Bonus) Filtering and sorting UI

---

## ✨ Features

### Backend (Node.js + Express)
- **RESTful API** serving product data from `products.json`
- **Dynamic price calculation** using real-time gold price (GoldAPI)
- **Filtering**: Query params for price range and popularity score
- **Sorting**: By price or rating (asc/desc)
- **Error handling** for missing/corrupt data or API failures

### Frontend (Next.js + TailwindCSS)
- **Pixel-perfect, responsive UI** matching the design PDF
- **Product cards**: Name, price, color picker, rating, image
- **Color picker**: Instantly changes product image
- **Rating**: Popularity score shown as 0.0–5.0 with precise star fill
- **Carousel**: Swiper.js with arrows (desktop) and swipe (mobile)
- **Filter bar**: Price and rating range sliders, sort dropdown
- **Mobile-first**: Modal filter UI on mobile, grid on desktop
- **Modern fonts**: Avenir & Montserrat
- **Fast, accessible, and SEO-friendly**

---

## 🛠️ Technology Stack

| Layer     | Technology               | Purpose                       |
|-----------|---------------------------|--------------------------------|
| Data      | products.json             | Static product data            |
| Backend   | Node.js, Express          | REST API, filtering, pricing   |
| Gold Price| GoldAPI                   | Real-time gold price           |
| Frontend  | Next.js, React, Tailwind  | UI, SSR, styling               |
| Carousel  | Swiper.js                 | Responsive carousel            |
| Fonts     | Avenir, Montserrat        | Design fidelity                |
| Hosting   | Vercel (frontend), Render (backend) | Deployment           |

---

## 📥 Installation & Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/<menesgul>/aurora-jewelry.git
cd aurora-jewelry
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with your GoldAPI key:
echo GOLD_API_KEY=your_goldapi_key > .env
node server.js
```
- Runs at: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Runs at: http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint                                | Description                        |
|--------|------------------ ----------------------|------------------------------------|
| GET    | /api/products                           | Returns all products               |
| GET    | /api/products?minPrice=100&maxPrice=500 | Filter by price                    |
| GET    | /api/products?minScore=4.0              | Filter by rating                   |
| GET    | /api/products?sort=price-asc            | Sort by price                      |

- **Query params:** `minPrice`, `maxPrice`, `minScore`, `maxScore`, `sort`
- **Returns:** Array of products with calculated price and rating

---

## 🖼️ Screenshots is cared while designing.

### Desktop
- Grid layout, hover effects, color picker, carousel arrows

### Tablet
- 2-column responsive grid, swipe carousel

### Mobile
- Single column, modal filter, swipe carousel, large touch targets

---

## 📋 Assignment Requirements Coverage
- [x] **Backend**: REST API, dynamic price, real-time gold, filtering
- [x] **Frontend**: Design fidelity, responsive, color picker, rating, carousel
- [x] **Bonus**: Filtering & sorting (UI + API)
- [x] **Deployment**: Vercel (frontend), Render (backend)
- [x] **Version control**: GitHub repo

---

## 👨‍💻 Author & Contact
- Developed by Muhammet Enes Gül

---

## 📄 License
This project is for demonstration and technical assessment purposes only. 