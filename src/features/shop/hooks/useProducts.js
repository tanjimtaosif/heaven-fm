import { useMemo, useState } from 'react'
import {
  PRODUCTS,
  FEATURED_PRODUCTS,
  PRODUCT_CATEGORIES,
  SORT_OPTIONS,
  PRICE_RANGES,
  STOCK_FILTER_OPTIONS,
  BESPOKE_PRODUCTS,
  filterProducts,
  getProductById,
  getProductsByCategory,
} from '@/constants/productsData'

export function useProducts(initialFilters = {}) {
  const [filters, setFilters] = useState({
    categoryId: 'all',
    subcategory: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: 'featured',
    searchQuery: '',
    stockFilter: 'all',
    ...initialFilters,
  })

  const filteredProducts = useMemo(() => {
    if (
      filters.categoryId === 'bespoke' ||
      filters.categoryId === 'bespoke-commissions'
    ) {
      return BESPOKE_PRODUCTS
    }
    return filterProducts(filters)
  }, [filters])

  const setCategory = (categoryId) => {
    setFilters((prev) => ({ ...prev, categoryId, subcategory: 'all' }))
  }

  const setSubcategory = (subcategory) => {
    setFilters((prev) => ({ ...prev, subcategory }))
  }

  const setSortBy = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }))
  }

  const setPriceRange = (minPrice, maxPrice) => {
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }))
  }

  const setSearchQuery = (searchQuery) => {
    setFilters((prev) => ({ ...prev, searchQuery }))
  }

  const setStockFilter = (stockFilter) => {
    setFilters((prev) => ({ ...prev, stockFilter }))
  }

  const resetFilters = () => {
    setFilters({
      categoryId: 'all',
      subcategory: 'all',
      minPrice: 0,
      maxPrice: Infinity,
      sortBy: 'featured',
      searchQuery: '',
      stockFilter: 'all',
    })
  }

  return {
    products: filteredProducts,
    allProducts: PRODUCTS,
    featuredProducts: FEATURED_PRODUCTS,
    categories: PRODUCT_CATEGORIES,
    sortOptions: SORT_OPTIONS,
    priceRanges: PRICE_RANGES,
    stockFilterOptions: STOCK_FILTER_OPTIONS,
    filters,
    setFilters,
    setCategory,
    setSubcategory,
    setSortBy,
    setPriceRange,
    setSearchQuery,
    setStockFilter,
    resetFilters,
    totalCount: filteredProducts.length,
    getProductById,
    getProductsByCategory,
  }
}
