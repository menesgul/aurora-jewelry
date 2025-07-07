import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';

const SORT_OPTIONS = [
  { value: '', label: 'Sort' },
  { value: 'price-asc', label: 'Price (Low → High)' },
  { value: 'price-desc', label: 'Price (High → Low)' },
  { value: 'rating-desc', label: 'Rating (Descending)' },
  { value: 'rating-asc', label: 'Rating (Ascending)' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
  const selectedSort = SORT_OPTIONS.find(opt => opt.value === sort) || SORT_OPTIONS[0];
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
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </button>
          {showFilters && (
            <form className="flex flex-wrap items-center gap-6 ml-4 h-[110px]" onSubmit={e => {e.preventDefault(); applyFilters();}}>
              <div className="flex flex-col items-center justify-center h-full min-w-[200px]">
                <label className="font-montserrat font-medium text-[15px] text-[#222] mb-1">Price Range</label>
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
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-normal text-[13px] text-[#222]">${priceRange[0]}</span>
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-normal text-[13px] text-[#222]">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full min-w-[200px]">
                <label className="font-montserrat font-medium text-[15px] text-[#222] mb-1">Rating Range</label>
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
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-normal text-[13px] text-[#222]">{scoreRange[0]}</span>
                    <span className="bg-white shadow px-2 py-0.5 rounded-lg font-montserrat font-normal text-[13px] text-[#222]">{scoreRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="min-w-[220px]">
                <Listbox value={sort} onChange={setSort}>
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className={
                        classNames(
                          "w-full flex items-center justify-between px-4 py-2 border rounded-xl shadow-sm font-montserrat font-normal text-[15px] text-[#222] bg-white transition-all duration-200",
                          open ? "border-[#E6CA97] ring-2 ring-[#E6CA97]" : "border-[#E6CA97]",
                          "focus:outline-none focus:ring-2 focus:ring-[#E6CA97] focus:border-[#E6CA97]"
                        )
                      }>
                        <span>{selectedSort.label}</span>
                        <svg
                          className={classNames("ml-2 h-4 w-4 transition-transform duration-200", open ? "rotate-180" : "rotate-0")}
                          fill="none"
                          stroke="#E6CA97"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-[#E6CA97] rounded-xl shadow-lg py-2 focus:outline-none min-w-[220px]">
                        {SORT_OPTIONS.map((option) => (
                          <Listbox.Option
                            key={option.value}
                            value={option.value}
                            as={Fragment}
                          >
                            {({ active, selected }) => (
                              <div
                                className={classNames(
                                  "cursor-pointer select-none px-4 py-2 font-montserrat font-normal text-[15px] whitespace-nowrap",
                                  selected ? "bg-[#E6CA97] text-white" : active ? "bg-[#f7ecd7] text-[#222]" : "text-[#222]"
                                )}
                              >
                                {option.label}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-100 text-[#222] font-montserrat font-medium text-[15px] rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-[#222] font-montserrat font-medium text-[15px] rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Clear
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