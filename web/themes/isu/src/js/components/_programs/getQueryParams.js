import 'url-search-params-polyfill'

export function setQueryParams(filters, search) {
    const searchParams = new URLSearchParams()
    searchParams.set('search', search)
    Object.keys(filters).forEach((filterName) => {
        if (filterName != 'date') {
            const filterVals = filters[filterName]
            searchParams.set(filterName, filterVals.join(';'))
        }
    })
    const newUrl = decodeURIComponent(
        `${window.location.pathname}?${encodeURIComponent(searchParams)}`
    )
    window.history.pushState({}, '', newUrl)
}

export function getQueryParams() {
    const searchParams = new URLSearchParams(window.location.search)

    const preFilterSearch = searchParams.get('search')
    const preFilterArea = searchParams.get('area')

    const preFilterGrade = searchParams.get('grade')
    const preFilterDuration = searchParams.get('duration')

    const preFilterFilters = {}

    if (preFilterArea) {
        const values = preFilterArea.split(';')

        preFilterFilters.area = values
    }

    if (preFilterGrade) {
        const values = preFilterGrade.split(';')
        preFilterFilters.grade = values
    }

    if (preFilterDuration) {
        const values = preFilterDuration.split(';')
        preFilterFilters.duration = values
    }

    return { preFilterSearch, preFilterFilters }
}
