import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SORT_OPTIONS = [
  { value: '', label: 'Sırala' },
  { value: 'price-asc', label: 'Ucuzdan Pahalıya' },
  { value: 'price-desc', label: 'Pahalıdan Ucuza' },
  { value: 'rating-desc', label: 'Yüksek Puan → Düşük' },
  { value: 'rating-asc', label: 'Düşük Puan → Yüksek' },
];

export default function FilterBar({
  showFilters,
  setShowFilters,
  priceRange,
  setPriceRange,
  scoreRange,
  setScoreRange,
  sort,
  setSort,
  applyFilters,
  clearFilters,
  hasActiveFilters,
  filteredCount
}) {
  return (
    <div className="w-full flex justify-center px-4 mb-6">
      <div className={`flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 h-[72px] max-w-full sm:w-auto sm:max-w-fit mx-auto px-6 min-w-[340px]`} style={{width: showFilters ? 'fit-content' : 'fit-content', minWidth: 0}}>
        <div className="flex items-center gap-4 flex-1 w-full h-full">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-montserrat font-medium text-[15px] transition-all duration-200 ${
              showFilters || hasActiveFilters 
                ? 'bg-[#E6CA97] text-white' 
                : 'bg-gray-50 text-[#222] hover:bg-gray-100'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4H21V6.172L13.172 14H10.828L3 6.172V4ZM3 20V17.828L10.828 10H13.172L21 17.828V20H3Z" fill="currentColor"/>
            </svg>
            Filtreler
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </button>
          {showFilters && (
            <form className="flex flex-wrap items-center gap-6 ml-4 h-[110px]" onSubmit={e => {e.preventDefault(); applyFilters();}}>
              <div className="flex flex-col items-center justify-center h-full min-w-[200px]">
                <label className="font-montserrat font-medium text-[15px] text-[#222] mb-1">Fiyat Aralığı</label>
                <div className="w-[180px] flex flex-col items-center relative">
                  <Slider
                    range
                    min={0}
                    max={1000}
                    value={priceRange}
                    onChange={setPriceRange}
                    allowCross={false}
                    trackStyle={[{ backgroundColor: '#E6CA97', height: 6 }]}
                    handleStyle={[
                      { borderColor: '#E6CA97', backgroundColor: '#fff', width: 20, height: 20, marginTop: -7 },
                      { borderColor: '#E6CA97', backgroundColor: '#fff', width: 20, height: 20, marginTop: -7 }
                    ]}
                    railStyle={{ backgroundColor: '#f3f3f3', height: 6 }}
                  />
                  <div className="flex justify-between w-full mt-1">
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-medium text-[13px] text-[#222]">${priceRange[0]}</span>
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-medium text-[13px] text-[#222]">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full min-w-[200px]">
                <label className="font-montserrat font-medium text-[15px] text-[#222] mb-1">Puan Aralığı</label>
                <div className="w-[180px] flex flex-col items-center relative">
                  <Slider
                    range
                    min={0}
                    max={5}
                    step={0.1}
                    value={scoreRange}
                    onChange={setScoreRange}
                    allowCross={false}
                    trackStyle={[{ backgroundColor: '#E6CA97', height: 6 }]}
                    handleStyle={[
                      { borderColor: '#E6CA97', backgroundColor: '#fff', width: 20, height: 20, marginTop: -7 },
                      { borderColor: '#E6CA97', backgroundColor: '#fff', width: 20, height: 20, marginTop: -7 }
                    ]}
                    railStyle={{ backgroundColor: '#f3f3f3', height: 6 }}
                  />
                  <div className="flex justify-between w-full mt-1">
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-medium text-[13px] text-[#222]">{scoreRange[0]}</span>
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-medium text-[13px] text-[#222]">{scoreRange[1]}</span>
                  </div>
                </div>
              </div>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 font-montserrat font-medium text-[15px] text-[#222] bg-white focus:outline-none focus:ring-1 focus:ring-[#E6CA97] focus:border-[#E6CA97]"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-100 text-[#222] font-montserrat font-medium text-[15px] rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Uygula
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-[#222] font-montserrat font-medium text-[15px] rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Temizle
              </button>
            </form>
          )}
          {hasActiveFilters && !showFilters && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600 ml-4">
              <span>•</span>
              <span>{filteredCount} ürün</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 