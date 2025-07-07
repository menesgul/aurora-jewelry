'use client';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import FilterBar from "./FilterBar";

const COLOR_OPTIONS = [
  { key: 'yellow', label: 'Yellow Gold', color: '#E6CA97' },
  { key: 'white', label: 'White Gold', color: '#D9D9D9' },
  { key: 'rose', label: 'Rose Gold', color: '#E1A4A9' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Sırala' },
  { value: 'price-asc', label: 'Ucuzdan Pahalıya' },
  { value: 'price-desc', label: 'Pahalıdan Ucuza' },
  { value: 'rating-desc', label: 'Yüksek Puan → Düşük' },
  { value: 'rating-asc', label: 'Düşük Puan → Yüksek' },
];

function Star({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 15.27L16.18 18L14.54 11.97L19 7.24L12.81 6.63L10 1L7.19 6.63L1 7.24L5.46 11.97L3.82 18L10 15.27Z"
        fill={filled ? '#E6CA97' : '#D9D9D9'}
        stroke="#E6CA97"
        strokeWidth="0.5"
        className="transition-colors duration-200"
      />
    </svg>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtreleme state'leri
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [scoreRange, setScoreRange] = useState([0, 5]);

  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API hatası");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const initialColors = {};
        data.forEach((_, idx) => {
          initialColors[idx] = 'yellow';
        });
        setSelectedColors(initialColors);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Sıralama fonksiyonu
  const sortProducts = (arr) => {
    if (sort === 'price-asc') return [...arr].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...arr].sort((a, b) => b.price - a.price);
    if (sort === 'rating-desc') return [...arr].sort((a, b) => (b.popularityScore - a.popularityScore));
    if (sort === 'rating-asc') return [...arr].sort((a, b) => (a.popularityScore - b.popularityScore));
    return arr;
  };

  // Filtreleme fonksiyonu
  const applyFilters = () => {
    let filtered = [...products];
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    filtered = filtered.filter(p => (p.popularityScore * 5).toFixed(1) >= scoreRange[0] && (p.popularityScore * 5).toFixed(1) <= scoreRange[1]);
    filtered = sortProducts(filtered);
    setFilteredProducts(filtered);
    setShowFilters(false);
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setScoreRange([0, 5]);
    setSort('');
    setFilteredProducts(products);
    setShowFilters(false);
  };

  const handleColorChange = (idx, color) => {
    setSelectedColors((prev) => ({ ...prev, [idx]: color }));
  };

  const hasActiveFilters = priceRange[0] !== 0 || priceRange[1] !== 1000 || scoreRange[0] !== 0 || scoreRange[1] !== 5;

  // Sıralama değiştiğinde anında uygula
  useEffect(() => {
    setFilteredProducts((prev) => sortProducts(prev));
    // eslint-disable-next-line
  }, [sort]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-10">
      <h1 className="font-avenir font-normal text-[45px] mb-8 text-center text-[#222]">
        Product List
      </h1>
      <FilterBar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        scoreRange={scoreRange}
        setScoreRange={setScoreRange}
        sort={sort}
        setSort={setSort}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        filteredCount={filteredProducts.length}
      />

      <div className="w-full max-w-7xl px-4">
        {loading && <div className="text-center">Yükleniyor...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 font-montserrat">
            Filtre kriterlerinize uygun ürün bulunamadı.
          </div>
        )}
        {filteredProducts.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={32}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="!pb-12"
          >
            {filteredProducts.map((product, idx) => {
              const score = (product.popularityScore * 5).toFixed(1);
              return (
                <SwiperSlide key={idx}>
                  <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
                    <div className="w-full aspect-square flex items-center justify-center mb-4">
                      <img src={product.images?.[selectedColors[idx] || 'yellow']} alt={product.name} className="object-contain h-40 transition-all duration-200 group-hover:scale-105" />
                    </div>
                    <div className="font-montserrat font-medium text-[15px] mb-1 text-center text-[#222]">{product.name}</div>
                    <div className="font-montserrat font-normal text-[15px] mb-2 text-center text-[#222]">${product.price} USD</div>
                    <div className="flex items-center gap-2 mb-2">
                      {COLOR_OPTIONS.map((option) => (
                        <button
                          key={option.key}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${selectedColors[idx] === option.key ? 'border-black scale-125 shadow-md' : 'border-gray-300 hover:scale-110'}`}
                          style={{ backgroundColor: option.color }}
                          aria-label={option.label}
                          onClick={() => handleColorChange(idx, option.key)}
                        />
                      ))}
                    </div>
                    <div className="font-avenir font-normal text-[12px] text-gray-500 mb-2">
                      {COLOR_OPTIONS.find(c => c.key === selectedColors[idx])?.label}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} filled={i < Math.round(score)} />
                      ))}
                    </div>
                    <div className="font-avenir font-normal text-[14px] text-[#222]">{score}/5</div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </main>
  );
} 