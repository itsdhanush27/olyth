import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Custom hook to scroll to top of page on component mount and on route change
 * Useful for ensuring pages always start at the top when navigated to
 */
export function useScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
}
