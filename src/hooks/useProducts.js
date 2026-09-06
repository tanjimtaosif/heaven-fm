import { useMemo, useState } from 'react'
import {
  PRODUCTS,
  FEATURED_PRODUCTS,
  PRODUCT_CATEGORIES,
  SORT_OPTIONS,
  PRICE_RANGES,
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
    ...initialFilters,
  })

  const filteredProducts = useMemo(() => {
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

  const resetFilters = () => {
    setFilters({
      categoryId: 'all',
      subcategory: 'all',
      minPrice: 0,
      maxPrice: Infinity,
      sortBy: 'featured',
      searchQuery: '',
    })
  }

  return {
    products: filteredProducts,
    allProducts: PRODUCTS,
    featuredProducts: FEATURED_PRODUCTS,
    categories: PRODUCT_CATEGORIES,
    sortOptions: SORT_OPTIONS,
    priceRanges: PRICE_RANGES,
    filters,
    setFilters,
    setCategory,
    setSubcategory,
    setSortBy,
    setPriceRange,
    setSearchQuery,
    resetFilters,
    totalCount: filteredProducts.length,
    getProductById,
    getProductsByCategory,
  }
}
