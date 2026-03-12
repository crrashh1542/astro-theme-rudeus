export const HOME_PAGE_SIZE = 10

export const getHomeTotalPages = (totalItems: number) => {
    return Math.ceil(totalItems / HOME_PAGE_SIZE)
}

export const getHomePageItems = <T>(items: T[], page: number) => {
    const safePage = Math.max(page, 1)
    const start = (safePage - 1) * HOME_PAGE_SIZE
    return items.slice(start, start + HOME_PAGE_SIZE)
}

export const getHomeIndexPages = (totalItems: number) => {
    const totalPages = getHomeTotalPages(totalItems)
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => String(i + 2))
}

export const getHomePaginationLinks = (currentPage: number, totalPages: number) => {
    const prevHref = currentPage > 2 ? `/${currentPage - 1}` : currentPage === 2 ? '/' : null
    const nextHref = currentPage < totalPages ? `/${currentPage + 1}` : null
    return { prevHref, nextHref }
}
